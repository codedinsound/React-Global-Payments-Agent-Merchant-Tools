import XLSX from 'xlsx';

class ExcelManager {
  static options = {
    bookType: 'xlsx',
  };

  // MARK: Create an Excel Sheet Report form Historical Data
  static createNewExcelSheetReport(data): void {
    var workbook = XLSX.utils.book_new();

    const structure = [['', '', '', '', '']];
  }
}

export default ExcelManager;
