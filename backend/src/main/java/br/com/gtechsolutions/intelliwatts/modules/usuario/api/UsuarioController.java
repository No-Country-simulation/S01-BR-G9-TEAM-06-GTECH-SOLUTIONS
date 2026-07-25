package br.com.gtechsolutions.intelliwatts.modules.usuario.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gtechsolutions.intelliwatts.modules.usuario.api.dto.CadastroUsuarioRequest;
import br.com.gtechsolutions.intelliwatts.modules.usuario.api.dto.UsuarioResponse;
import br.com.gtechsolutions.intelliwatts.modules.usuario.application.CadastrarUsuarioUseCase;
import br.com.gtechsolutions.intelliwatts.modules.usuario.domain.Usuario;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class UsuarioController {

    private final CadastrarUsuarioUseCase cadastrarUsuarioUseCase;

    public UsuarioController(CadastrarUsuarioUseCase cadastrarUsuarioUseCase) {
        this.cadastrarUsuarioUseCase = cadastrarUsuarioUseCase;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<UsuarioResponse> cadastrar(
            @Valid @RequestBody CadastroUsuarioRequest request) {
        Usuario usuario = cadastrarUsuarioUseCase.executar(
                request.nome(),
                request.email(),
                request.senha());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(UsuarioResponse.de(usuario));
    }
}
