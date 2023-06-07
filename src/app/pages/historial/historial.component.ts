import { Component, OnInit } from '@angular/core';
import { ConversionService } from '../../services/conversion.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  conversiones = [];
  data: any = [];
  constructor(private conversionService: ConversionService) {}

  ngOnInit(): void {
    this.conversionService.getHistorial().subscribe((res: any) => {
      console.log(res);

      this.conversiones = res.data;
    });
  }

  exportExcel() {
    this.data = [];

    for (const conv of this.conversiones) {
      const {
        original_amount,
        date_conversion,
        conversion_amount,
        usuario,
        uf,
        created_at,
      } = conv;
      const { fullname } = usuario;
      this.data.push({
        "Valor ingresado": original_amount,
        "Fecha de UF": date_conversion,
        "Valor de UF": uf,
        'Monto Convertido(CLP)': conversion_amount,
        'Fecha Actividad': created_at,
        Usuario: fullname,
      });
    }

    console.log(this.data);

    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.data);


      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
