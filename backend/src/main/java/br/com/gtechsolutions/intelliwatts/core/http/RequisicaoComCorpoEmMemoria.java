package br.com.gtechsolutions.intelliwatts.core.http;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

final class RequisicaoComCorpoEmMemoria extends HttpServletRequestWrapper {

    private final byte[] corpo;
    private ServletInputStream inputStream;
    private BufferedReader reader;

    RequisicaoComCorpoEmMemoria(
            HttpServletRequest request,
            byte[] corpo) {
        super(request);
        this.corpo = corpo;
    }

    @Override
    public int getContentLength() {
        return corpo.length;
    }

    @Override
    public long getContentLengthLong() {
        return corpo.length;
    }

    @Override
    public ServletInputStream getInputStream() {
        if (inputStream == null) {
            inputStream = new InputStreamEmMemoria(corpo);
        }

        return inputStream;
    }

    @Override
    public BufferedReader getReader() {
        if (reader == null) {
            String encoding = getCharacterEncoding();
            Charset charset = encoding == null
                    ? StandardCharsets.UTF_8
                    : Charset.forName(encoding);
            reader = new BufferedReader(
                    new InputStreamReader(getInputStream(), charset));
        }

        return reader;
    }

    private static final class InputStreamEmMemoria
            extends ServletInputStream {

        private final ByteArrayInputStream delegate;

        private InputStreamEmMemoria(byte[] corpo) {
            delegate = new ByteArrayInputStream(corpo);
        }

        @Override
        public int read() {
            return delegate.read();
        }

        @Override
        public int read(byte[] buffer, int offset, int length) {
            return delegate.read(buffer, offset, length);
        }

        @Override
        public int available() {
            return delegate.available();
        }

        @Override
        public boolean isFinished() {
            return delegate.available() == 0;
        }

        @Override
        public boolean isReady() {
            return true;
        }

        @Override
        public void setReadListener(ReadListener readListener) {
            Objects.requireNonNull(readListener);

            try {
                if (!isFinished()) {
                    readListener.onDataAvailable();
                }
                if (isFinished()) {
                    readListener.onAllDataRead();
                }
            } catch (IOException exception) {
                readListener.onError(exception);
            }
        }

        @Override
        public void close() throws IOException {
            delegate.close();
        }
    }
}
