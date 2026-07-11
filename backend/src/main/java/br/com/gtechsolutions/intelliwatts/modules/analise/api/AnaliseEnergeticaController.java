package br.com.gtechsolutions.intelliwatts.modules.analise.api;

import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaRequest;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.application.AnalisarConsumoEnergeticoUseCase;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/analises-energeticas")
public class AnaliseEnergeticaController {

    private final AnalisarConsumoEnergeticoUseCase useCase;

    public AnaliseEnergeticaController(AnalisarConsumoEnergeticoUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping
    public ResponseEntity<AnaliseEnergeticaResponse> analisar(
            @Valid @RequestBody AnaliseEnergeticaRequest request
    ) {
        return ResponseEntity.ok(useCase.executar(request));
    }
}
