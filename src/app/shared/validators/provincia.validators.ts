import { Injectable } from "@angular/core";
import { ComuniService } from "../../api/comuni.service";
import { AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs/operators";
import { Comune } from "../../models/comuni.model";

@Injectable()
export class ProvinciaValidators {
  constructor(private comuniService: ComuniService) { }

  public provinceValidators(): AsyncValidatorFn {
    return (control => this.comuniService.getItalianProvices().pipe(
      map(comuni =>
        comuni.filter(c =>
          c.provincia.nome.toLowerCase() === control.value.toLowerCase()
        )
      ),
      map(filteredProvince => filteredProvince.length ? null : { province: 'Provincia Errata' }),
    ))
  }

  public comuniValidators(): AsyncValidatorFn {
    return (group => this.comuniService.getItalianProvices().pipe(
      map((comuni: Comune[]) => {
        const comuneDiNascita = group.get('comuneDiNascita')?.value.toLowerCase();
        const provinciaDiNascita = group.get('provinciaDiNascita')?.value.toLowerCase();

        const comune = comuni.find(c => c.nome.toLowerCase() === comuneDiNascita);

        if (comune) {
          const filteredComuneByProvincia = comuni
            .filter(c => c.provincia.nome.toLowerCase() === provinciaDiNascita)
            .find(c => c.nome.toLowerCase() === comuneDiNascita);

          return filteredComuneByProvincia
            ? null
            : { comuni: 'Il comune non fa parte della provincia selezionata' }
        }

        return { comuni: 'Il comune non esiste' };
      })
    ))
  }
}
