function numberToWord(number) {
  const position = [
    "Primer",
    "Segundo",
    "Tercer",
    "Cuarto",
    "Quinto",
    "Sexto",
    "Septimo",
    "Octavo",
    "Noveno",
    "Decimo",
    "Undécimo",
    "Duodécimo",
    "Decimotercero",
    "Decimocuarto",
    "Decimoquinto",
    "Decimosexto",
    "Decimoséptimo",
    "Decimoctavo",
    "Decimonoveno",
    "vigésimo",
    "Vigésimo primero",
    "Vigésimo segundo",
    "Vigésimo tercero",
    "Vigésimo cuarto",
    "Vigésimo quinto",
    "Vigésimo sexto",
    "Vigésimo séptimo",
    "Vigésimo octavo",
    "Vigésimo noveno",
    "Trigésimo",
    "Trigésimo primero",
    "Trigésimo segundo",
    "Trigésimo terceros",
  ];
  return position[number];
}

export { numberToWord };
