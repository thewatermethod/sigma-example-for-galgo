    const fs = require('fs');

    var termstable = [
        [1, "Esfuerzo"],
        [2, "Fuerza"],
        [3, "Gentileza"],
        [4, "Honra"],
        [5, "Voluntad"],
        [11, "amor"],
        [12, "admiración"],
        [13, "riqueza"],
        [14, "hermosura"],
        [15, "libertad"],
        [16, "burla"],
        [17, "hado"],
        [18, "Justicia"],
        [19, "tiranía"],
        [20, "virtud"],
      ];

      /* will want to convert all to lowercase? */
      var contextstable = [
        [1, "El", "regido", "cordura"],
        [4, "vida", "ganaste"],
        [4, "virtud", "valent\\u00eda"],
        [4, "valor", "causa", "justa"],
        [4, "gana", "bien", "virtud", "magn\\u00edfico", "liberal"],
        [4, "industrioso", "inventivo", "astuto"],
        [4, "alcanzar", "fama", "alta", "sangre", "venas", "limpia"],
        [1, "dolor", "dolor", "mal", "turbada", "aviva", "arr\\u00e9ciate"],
        [
          1,
          "Perdido",
          "desventurado",
          "abatido",
          "ciego",
          "Deshecho",
          "vencido",
          "ca\\u00eddo",
          "no",
          "capaz",
        ],
        [
          1,
          "triste",
          "dolor",
          "tristeza",
          "contrari\\u00f3",
          "sufrir",
          "pena",
          "osad\\u00eda",
          "tristes",
          "\\u00a1Muerta",
          "carec\\u00e9is",
        ],
        [4, "mundanos", "bienes?", "virtud", "liberalidad", "franqueza"],
        [4, "digno", "merecimiento"],
        [4, "discreci\\u00f3n", "prudencia", "experiencia", "vida"],
        [4, "perdici\\u00f3n", "yerro?", "casa"],
        [4, "da\\u00f1o", "p\\u00eda", "santa"],
        [4, "buen", "comer", "hacienda", "hered\\u00f3", "holgar"],
        [4, "provecho", "ganancia"],
        [4, "beneficios", "pagos"],
        [4, "fortuna", "provecho"],
        [4, "cumbre", "crecer"],
        [4, "da\\u00f1es", "palabras"],
        [4, "remedio", "temor", "libre"],
        [4, "da\\u00f1e", "fama", "cuerpo"],
        [4, "oficio?", "nombre", "casa"],
        [4, "mansedumbre", "concesi\\u00f3n", "inocencia"],
        [4, "persona", "fama"],
        [4, "toca", "padre"],
        [4, "nombre", "fama"],
        [4, "nombre"],
        [4, "nombre", "fama"],
        [4, "posesi\\u00f3n", "gloria", "riquezas"],
        [4, "amo"],
        [4, "amo", "rica", "ganancia"],
        [4, "fuerza", "virtud", "provecho", "ricos"],
        [4, "vida", "hacienda"],
        [4, "valent\\u00eda", "venci\\u00f3", "voluntad", "virtud"],
        [4, "palabra", "causa", "due\\u00f1o"],
        [4, "merced", "bien"],
        [4, "voluntad", "hacienda", "vida"],
        [4, "valor", "nombre"],
        [4, "cuerpos", "almas"],
        [4, "esfuerzo", "valor", "causa", "justa"],
        [4, "gloria", "pensamiento"],
        [4, "recompensados", "dineros", "alaben", "cr\\u00eda", "artes"],
        [4, "padecen", "negra", "sufrir\\u00e1n"],
        [4, "estirado", "cuerpo", "casta", "negra"],
        [4, "caudal", "hombres", "de", "bien"],
        [
          2,
          "saber",
          "esfuerzo",
          "ardid",
          "ofrecimiento",
          "astucia",
          "solicitud?",
        ],
        [
          1,
          "fuerzas",
          "saber",
          "ardid",
          "ofrecimiento",
          "astucia",
          "solicitud?",
        ],
        [5, "servicio", "sacrificio", "devoci\\u00f3n", "obras", "p\\u00edas"],
        [1, "virtud", "liberalidad", "gentileza", "lealtad"],
        [1, "virtud", "armas", "peleando", "moros", "guerra"],
        [1, "memoria", "Espa\\u00f1a", "natural", "ordinario"],
        [1, "flaqueza", "dolor", "llagas", "prisi\\u00f3n", "guerra"],
        [1, "linaje", "gracia", "disposici\\u00f3n", "estimados"],
        [1, "l\\u00e1grimas", "sospiros", "memoria", "l\\u00e1stimas"],
        [1, "venciste", "suerte", "determinaci\\u00f3n", "cielo"],
        [2, "ganalla", "defendella", "alcaide"],
        [
          2,
          "fee",
          "virtud",
          "vencedores",
        ], 
        [18, "desesperarme", "sa\\u00f1a", "agravios"],
        [5, "milagroso", "sacramento", "buenos", "casados", "almas"],
        [5, "deseos", "enamoran", "rinden"],
        [5, "queridos", "amor"],
        [5, "se\\u00f1or", "esposa", "gusto"],
        [5, "virtuosa", "valiente", "h\\u00e1gase"],
        [5, "desenvoltura", "intento", "gusto"],
        [5, "gusto", "bajar", "obedecelle"],
        [5, "desposase", "contrayentes", "desposorio"],
      ];

      var real_linkages = [];
      for (i = 0; i < contextstable.length; i++) {
        var keyword = "";
        for (j = 0; j < termstable.length; j++) {
          if (contextstable[i][0] == termstable[j][0]) {
            keyword = termstable[j][1];
          }
        }
        for (q = 1; q < contextstable[i].length; q++) {
          var temp_context = [keyword, contextstable[i][q]];
          real_linkages.push(temp_context);
        }
      }
      real_linkages.sort();

      var uniqueWords = [];
      for (i = 0; i < real_linkages.length; i++) {
        if (!uniqueWords.includes(real_linkages[i][0])) {
          uniqueWords.push(real_linkages[i][0]);
        }
        if (!uniqueWords.includes(real_linkages[i][1])) {
          uniqueWords.push(real_linkages[i][1]);
        }
      }
      var nonUniqueWords = [];
      for (i = 0; i < real_linkages.length; i++) {
        nonUniqueWords.push(real_linkages[i][0]);
        nonUniqueWords.push(real_linkages[i][1]);
      }
      nonUniqueWords.sort();

      var uniqueLinkages = [];
      for (i = 0; i < real_linkages.length; i++) {
        if (!uniqueLinkages.includes(real_linkages[i])) {
          uniqueLinkages.push(real_linkages[i]);
        }
      }
      uniqueLinkages.sort();

      var i,
        s,
        N = uniqueWords.length,
        E = uniqueLinkages.length;
    
    var data = {
          nodes: [],
          edges: [],
        };

      for (i = 0; i < N; i++)
        data.nodes.push({
          id: uniqueWords[i],
          label: uniqueWords[i],
          x: Math.random(),
          y: Math.random(),
          size:
            nonUniqueWords.lastIndexOf(uniqueWords[i]) -
            nonUniqueWords.indexOf(uniqueWords[i]) +
            1,
          color: "#000", // '#666'
        });

      function weight(array, entry) {
        var counts = {};
        var compare = 0;
        var mode;
        for (var i = 0; i < array.length; i++) {
          var item = array[i];
          if (counts[item] === undefined) {
            counts[item] = 1;
          } else {
            counts[item]++;
          }
          if (counts[item] > compare) {
            compare = counts[item];
            mode = array[i];
          }
        }
        if (!entry) {
          return counts[mode];
        } else {
          return counts[entry];
        }
      }

      var colors = ["red", "blue", "green", "violet", "yellow", "orange"];

      for (i = 0; i < E; i++) {
        var fraction =
          weight(real_linkages, real_linkages[i]) / weight(real_linkages);
        data.edges.push({
          id: "e" + i,
          source: uniqueLinkages[i][0],
          target: uniqueLinkages[i][1],
          size: fraction,
          type: "curve",
          color: colors[Math.floor(Math.random() * 7)], // ('#'.concat(Math.round((fraction * 10)))).concat('00'), //  // '#ccc',
          hover_color: "#000",
        });
      }


fs.writeFile('./dist/data.json', `${JSON.stringify(data, null, 2)}`, (err)=> {
  if (err) {
      console.log(err)
  };
})      


fs.writeFile('./data.js', `export const data = ${JSON.stringify(data, null, 2)}`, (err)=> {
    if (err) {
        console.log(err)
    };
})

