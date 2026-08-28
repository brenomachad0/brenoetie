# 💍 Site de Casamento — Tiê & Breno

Site estático (HTML/CSS/JS), sem etapa de build. Abre em qualquer navegador e
publica em qualquer hospedagem gratuita.

## 📁 Estrutura

```
site/
├── index.html          # a página
├── css/styles.css      # estilos
├── js/
│   ├── main.js         # lógica (i18n, contagem, RSVP, Pix, música) ← configurações aqui
│   └── petals.js       # pétalas em Three.js (hero)
├── assets/
│   ├── img/            # fotos otimizadas
│   ├── pix-qr.png      # QR Code do Pix (chave celular)
│   └── music.mp3       # Rod Stewart – The Way You Look Tonight
├── apps-script.gs      # código do Google Sheets (RSVP)
└── GUIA.md             # este arquivo
```

## ▶️ Ver localmente

No Terminal, dentro da pasta `site`:

```bash
python3 -m http.server 8777
```

Depois abra **http://localhost:8777** no navegador.
(Precisa de servidor por causa dos módulos JS — abrir o arquivo direto não funciona.)

Existe também um modo estático de teste: **http://localhost:8777/?flat=1**
(sem animações, útil pra checar o conteúdo).

---

## ✅ 3 coisas pra finalizar

### 1) RSVP → Google Sheets  *(obrigatório pra receber confirmações)*
1. Crie uma planilha no Google Sheets.
2. **Extensões → Apps Script**, apague tudo e cole o conteúdo de `apps-script.gs`.
3. **Implantar → Nova implantação → App da Web**
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**
4. Copie a URL (termina em `/exec`).
5. Abra `js/main.js` e cole em:
   ```js
   RSVP_ENDPOINT: "COLE_A_URL_AQUI",
   ```
Enquanto estiver vazio, o formulário mostra um aviso e não envia.

### 2) Música 🎵
Já está pronta (`assets/music.mp3`). Toca ao primeiro clique/toque na página
(navegadores bloqueiam autoplay). O botão redondo no canto liga/desliga.
Para trocar, basta substituir o arquivo `assets/music.mp3`.

### 3) Cartão de crédito 💳 (opcional)
Hoje o botão "Pagar com cartão de crédito" aparece como **"em breve"**.
Para ativá-lo, crie um **link de pagamento** e cole a URL em
`js/main.js` → `CONFIG.CARD_URL`.

Melhor caminho (conta pessoa física, com CPF, sem abrir empresa):
- **Mercado Pago** — o mais simples e reconhecido pelos convidados. App → "Link de
  pagamento" → aceita cartão (com parcelamento), Pix e boleto. Cai na sua conta.
- **Asaas** — também ótimo (conta grátis com CPF). Crie um "Link de pagamento".
  Bom se quiser Pix + cartão no mesmo link.

Dica: dá pra criar **um link com valor em aberto** (o convidado digita o valor) e
usar esse mesmo link no botão. Ambos cobram uma taxa por transação no cartão —
o Pix continua sendo o caminho sem taxa.

### 4) Horário da recepção ⏰
Está como **"logo após a cerimônia"**. Quando tiver o horário, edite em
`js/main.js` as chaves `details.reception.time` (PT e EN).

---

## ⚙️ Onde editar as informações

Tudo fica em `js/main.js`:

| O quê | Onde |
|---|---|
| Textos (PT e EN) | objeto `I18N` |
| Data/hora do casamento (contagem) | `CONFIG.WEDDING_DATE` |
| Links de mapa | `CONFIG.MAP_CHURCH`, `CONFIG.MAP_VENUE` |
| Chave Pix / QR | `CONFIG.PIX_PAYLOAD`, `CONFIG.PIX_KEY` (QR = `assets/pix-qr.png`) |
| URL do RSVP | `CONFIG.RSVP_ENDPOINT` |
| Presentes (nomes/valores) | cards em `index.html` + textos `gift.*` em `main.js` |

**Chave Pix atual:** celular `(61) 99626-1957` — Breno Neiva Machado (Santander).

---

## 🚀 Publicado (GitHub Pages)

O site já está **no ar**:

### 👉 https://brenomachad0.github.io/brenoetie/

Repositório: https://github.com/brenomachad0/brenoetie

**Para atualizar o site depois de editar qualquer arquivo**, rode dentro da
pasta `site`:

```bash
git add -A && git commit -m "ajustes" && git push
```

Em ~1 minuto o GitHub Pages publica a nova versão automaticamente.

**Domínio próprio** (ex: `brenoetie.com.br`): dá pra apontar pro GitHub Pages
(Settings → Pages → Custom domain) quando quiserem.

---

## 🎨 Créditos
- Fotos: **Frederico Gomes Photography**
- Bibliotecas: GSAP + ScrollTrigger, Three.js, Lenis (via CDN)
- Fontes: Cormorant Garamond + Jost (Google Fonts)
