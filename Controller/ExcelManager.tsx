import XLSX from 'xlsx';
import Utils from '../Utils';

class ExcelManager {
  static options = {
    bookType: 'xlsx',
  };

  // MARK: Create an Excel Sheet Report form Historical Data
  static generateNewExcelSheetAfterLoggingOut(data): void {
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      Utils.getTodaysDate(),
      true
    );

    XLSX.writeFileXLSX(workbook, `${Utils.getTodaysDate()}.xlsx`, this.options);
  }

  // MARK: Generates a Excel Sheet Layout for State
  static generateNewExcelLayout(): string[][] {
    let worksheet: string[][] = [
      [
        'Merchant ID',
        'DBA',
        'SV',
        'Caller Name',
        'Caller Title',
        'Caller Reason',
      ],
    ];
    return worksheet;
  }
}

export default ExcelManager;
