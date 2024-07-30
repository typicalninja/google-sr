import boxen from "boxen";
import { html, stripIndent, stripIndents } from "common-tags";
import { type ResultNode, ResultTypes } from "google-sr";

export function getJSONFormat(results: ResultNode[][]) {
	return JSON.stringify(results, null, 4);
}

export function getTXTFormat(results: ResultNode[][]) {
	const startTxt = stripIndents(html)`
    ${results.map(
			(page, i) => html`
        ==============${i + 1}/${results.length}==================
        ${page.map((data) => {
					switch (data.type) {
						case ResultTypes.SearchResult:
							return boxen(
								stripIndents`
            🔍 ${data.title}
            🔗 ${data.link}
            📝 ${data.description}
            `,
								{ padding: 1 },
							);
						case ResultTypes.TranslateResult:
							return boxen(
								stripIndents`
                  🌐 ${data.source.language}  => 🌍 ${data.translation.language}
                  📜 ${data.source.text}     => ✨ ${data.translation.text} ${
										data.translation.pronunciation
											? `(🔊 ${data.translation.pronunciation})`
											: ""
									}
                  `,
								{ padding: 1 },
							);
						case ResultTypes.DictionaryResult:
							return boxen(
								stripIndents(html)`
                  📚 ${data.word}
                  🔉 ${data.phonetic}

                  ${data.audio ? `🔊 ${data.audio}` : ""}

                  ${data.definitions.map(
										(definition) => stripIndent`
                  📖 ${definition[0]}
                      ↳ ${definition[1]}
                  `,
									)}
                  `,
								{ padding: 1 },
							);
						case ResultTypes.TimeResult:
							return boxen(
								stripIndents(html)`
                  📍 ${data.location}
                  ⏰ ${data.time}
                  🗣️ ${data.timeInWords}
                   `,
								{ padding: 1 },
							);
						case ResultTypes.CurrencyResult:
							return boxen(
								stripIndents(html)`
                  💰 ${data.from}  => 💸 ${data.to}
                     `,
								{ padding: 1 },
							);
						default:
							return "Unsupported";
					}
				})}
      `,
		)}
  `;

	return startTxt;
}

export function getHTMLFormat(
	results: ResultNode[][],
	query: string,
	total: number,
) {
	const pages = new Array(results.length).fill(null).map((_m, i) => i + 1);
	return html`
    <html>
      <head>
        <!-- Autogenerated by google-that (npm) on ${new Date().toDateString()} -->
        <title>Autogenerated query | ${query}</title>
        <style>
          body {
            height: 100vh;
            margin: 3;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
          }

          input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            margin-bottom: 20px;
            box-sizing: border-box;
          }

          li a {
            text-decoration: none;
            color: #333;
          }

          .searchResult {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px 0;
            border-radius: 10px;
            background-color: rgb(216, 245, 245);

            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .translateResult {
            align-items: center;
            background-color: rgb(243, 255, 174);
          }


          .dictionaryResult {
            background-color: rgb(189, 174, 255);
          }

          .currencyResult {
            background-color: rgb(241, 174, 255);
          }

          .timeResult {
            background-color: rgb(186, 202, 255);
          }

          .ulReset {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .hero {
            display: flex;
            gap: 3px;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
    
          .pagination {
            display: flex;
            gap: 3px;
            align-items: center;
            justify-content: center;
            font-size: large;
          }
        </style>
      </head>
      <body>
        <div class="hero">
          <input value="${query}" name="query" readonly />
          <h5>Generated on ${new Date().toDateString()}</h5>
          <h4>${total} results across ${results.length} pages</h4>
          <div class="pagination">
            <span><</span>
            ${pages.map((pageNo) => `<a href="#page${pageNo}">${pageNo}</a>`)}
            <span>></span>
          </div>
        </div>
        <hr />
        ${results.map(
					(page, i) => html(stripIndents)`
            <ul id="page-${i + 1}" class="ulReset">
              <h3 id="page${i + 1}">Page ${i + 1} ${results.length > 1 ? `of ${results.length} pages` : ""} | ${page.length} entries for this page</h3>
              ${page.map((result) => {
								switch (result.type) {
									case ResultTypes.SearchResult:
										return html`
                      <li class="searchResult">
                        <h1>${result.title}</h1>
                        <a href="${result.link}">${result.link}</a>
                        <p>${result.description}</p>
                      </li>
                    `;
									case ResultTypes.TranslateResult:
										return html`
                      <li class="searchResult translateResult">
                        <h3>
                          ${result.source.text}
                        </h3>
                        ⬇️
                        <div>
                          <h3>
                          ${result.translation.text}
                          </h3>
                          ${result.translation.pronunciation ? `<h5>📢 ${result.translation.pronunciation}</h5>` : ""}
                        </div>
                      </li>
                    `;
									case ResultTypes.DictionaryResult:
										return html`
                    <li class="searchResult dictionaryResult">
                      <h1>${result.word}</h1>
                      <p>${result.phonetic}</p>

                      <audio controls>
                        <source src="${result.audio}" type="audio/mp3">
                      </audio>
                      <ul>
                        ${result.definitions.map(
													(definition) => `
                        <li>
                          <h5>${definition[0]}</h5>
                          <p>${definition[1]}</p>
                        </li>
                        `,
												)}
                      </ul>
                    </li>
                    `;
									case ResultTypes.CurrencyResult:
										return html`
                    <li class="searchResult currencyResult">
                      <h3>${result.formula}</h3>
                    </li>
                    `;
									case ResultTypes.TimeResult:
										return html`
                    <li class="searchResult timeResult">
                      <h3>${result.location}</h3>
                      <p>${result.time}</p>
                      <p>${result.timeInWords}</p>
                    </li>
                    `;
									default:
										return "Unsupported";
								}
							})}
            </ul>
          `,
				)}
        <hr />
        <div class="pagination">
          <span><</span>
          ${pages.map((pageNo) => `<a href="#page${pageNo}">${pageNo}</a>`)}
          <span>></span>
        </div>
      </body>
    </html>
  `;
}
