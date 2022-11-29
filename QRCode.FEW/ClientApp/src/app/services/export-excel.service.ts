import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

export interface ROW_ITEM {
  ID: number;
  NAME: string;
  DEPARTMENT: string;
  MONTH: string;
  YEAR: number;
  SALES: number;
  CHANGE: number;
  LEADS: number;
}

export const imgBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAAN....ElFTkSuQmCC';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
  constructor() { }

  exportExcel(excelData: { title: any; data: any; headers: any }) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Data');

    let cot_length = 'F' + header.length;
    //Tạo ô title
    let gt_cell = worksheet.getCell(2, header.length);

    //Add Row and formatting
    worksheet.mergeCells('A1', gt_cell.address);
    let titleRow = worksheet.getCell('A1', gt_cell.address);
    titleRow.value = title;
    titleRow.font = {
      name: 'Times New Roman',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' },
    };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Date
    // worksheet.mergeCells('G1:H2');
    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    // let dateCell = worksheet.getCell('G1');
    // dateCell.value = date;
    // dateCell.font = {
    //   name: 'Times New Roman',
    //   size: 12,
    //   bold: true,
    // };
    // dateCell.alignment = { vertical: 'middle', horizontal: 'center' };

    //Add Image
    // let myLogoImage = workbook.addImage({
    //   base64: imgBase64,
    //   extension: 'png',
    // });
    // worksheet.mergeCells('A1:B4');
    // worksheet.addImage(myLogoImage, 'A1:B4');

    //Blank Row
    worksheet.addRow([]);

    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12,
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    headerRow.height = 30;
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Adding Data with Conditional Formatting
    data.forEach((d: any) => {
      let row = worksheet.addRow(Object.values(d));
      row.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '' },
          bgColor: { argb: '' },
        };
        cell.style = { alignment: { wrapText: true,vertical:'middle' } }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };       
      });
      // let sales = row.getCell(6);
      // let color = 'FF99FF99';
      // let sales_val = sales.value || 0;
      // // Conditional fill color
      // if (sales_val < 200000) {
      //   color = 'FF9999';
      // }

      // sales.fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: color },
      // };
    });
    for (let index = 0; index < header.length; index++) {
      const element = header[index];
      worksheet.getColumn(index + 1).width = element.toString().length + 10
    }
    // worksheet.getColumn(3).width = 100;
    worksheet.addRow([]);

    //Footer Row
    let footerRow = worksheet.addRow([
      'Ngày xuất file excel: ' + date,
    ]);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFB050' },
    };

    let gt_cell2 = worksheet.getCell(footerRow.number, header.length);
    //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    worksheet.mergeCells(`A${footerRow.number}:${gt_cell2.address}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, title + '.xlsx');
    });
  }
  exportExcel_Error(excelData: { title: any; data: any; headers: any }) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Data');

    let cot_length = 'F' + header.length;
    //Tạo ô title
    let gt_cell = worksheet.getCell(2, header.length);

    //Add Row and formatting
    worksheet.mergeCells('A1', gt_cell.address);
    let titleRow = worksheet.getCell('A1', gt_cell.address);
    titleRow.value = title;
    titleRow.font = {
      name: 'Times New Roman',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' },
    };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Date
    // worksheet.mergeCells('G1:H2');
    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    // let dateCell = worksheet.getCell('G1');
    // dateCell.value = date;
    // dateCell.font = {
    //   name: 'Times New Roman',
    //   size: 12,
    //   bold: true,
    // };
    // dateCell.alignment = { vertical: 'middle', horizontal: 'center' };

    //Add Image
    // let myLogoImage = workbook.addImage({
    //   base64: imgBase64,
    //   extension: 'png',
    // });
    // worksheet.mergeCells('A1:B4');
    // worksheet.addImage(myLogoImage, 'A1:B4');

    //Blank Row
    worksheet.addRow([]);

    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12,
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    headerRow.height = 30;
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Adding Data with Conditional Formatting
    data.forEach((d: any) => {
      let row = worksheet.addRow(Object.values(d));
      row.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '' },
          bgColor: { argb: '' },
        };
        cell.style = { alignment: { wrapText: true,vertical:'middle' } }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };       
      });
      // let sales = row.getCell(6);
      // let color = 'FF99FF99';
      // let sales_val = sales.value || 0;
      // // Conditional fill color
      // if (sales_val < 200000) {
      //   color = 'FF9999';
      // }

      // sales.fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: color },
      // };
    });
    for (let index = 0; index < header.length; index++) {
      const element = header[index];
      worksheet.getColumn(index + 1).width = element.toString().length + 10
    }
    // worksheet.getColumn(3).width = 100;
    worksheet.addRow([]);

    //Footer Row
    let footerRow = worksheet.addRow([
      'Ngày xuất file excel: ' + date,
    ]);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFB050' },
    };

    let gt_cell2 = worksheet.getCell(footerRow.number, header.length);
    //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    worksheet.mergeCells(`A${footerRow.number}:${gt_cell2.address}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, title + '.xlsx');
    });
  }
}