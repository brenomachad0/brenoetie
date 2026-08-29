/**
 * RSVP → Google Sheets  (Tiê & Breno)
 * ------------------------------------------------------------
 * Como usar:
 * 1. Crie uma planilha nova no Google Sheets.
 * 2. Menu  Extensões → Apps Script.
 * 3. Apague o conteúdo e cole este arquivo inteiro.
 * 4. Clique em Implantar → Nova implantação → tipo "App da Web".
 *      - Executar como: Eu
 *      - Quem tem acesso: Qualquer pessoa
 * 5. Copie a URL gerada (termina em /exec) e cole em
 *    js/main.js → CONFIG.RSVP_ENDPOINT.
 * ------------------------------------------------------------
 */
var SHEET_ID = '1hhllERzPPCWkAdw5O_e6sJRNgWRwNCZ64xnGW562dqA';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName('RSVP') || ss.insertSheet('RSVP');

    // Cabeçalho na primeira vez
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data/Hora', 'Nome', 'Adultos', 'Crianças', 'Idade das crianças', 'Presença', 'Idioma']);
    }

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.adultos || '1',
      data.criancas || '0',
      data.idades || '',
      data.presenca === 'nao' ? 'Não vai' : 'Confirmado',
      data.lang || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('RSVP endpoint ok');
}

// Rode esta função UMA vez no editor (botão Executar) para autorizar
// o acesso à planilha e conferir se a gravação funciona.
function testar() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName('RSVP') || ss.insertSheet('RSVP');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Data/Hora', 'Nome', 'Adultos', 'Crianças', 'Idade das crianças', 'Presença', 'Idioma']);
  }
  sheet.appendRow([new Date(), 'TESTE pelo editor (pode apagar)', '2', '1', '5 anos', 'Confirmado', 'pt']);
}
