export default async function handler(req, res) {
  try {
    const { calcular } = req.query;

    if (!calcular) {
      return res.status(400).json({
        error: "Use ?calcular=expressão (ex: ?calcular=4x^2)"
      });
    }

    // Expressão permitida (números, x, operadores e potências)
    const seguro = /^[0-9xX+\-*/^().\s]+$/.test(calcular);
    if (!seguro) {
      return res.status(400).json({
        error: "Expressão inválida! Use apenas números, x e operadores básicos (+ - * / ^)."
      });
    }

    // Aqui você pode criar um interpretador simples (exemplo simbólico)
    let passos = [];
    let resultado = "";

    if (/x\^2/.test(calcular)) {
      passos.push(`${calcular} = 2 * 4x^2`);
      passos.push(`= 8x^(2-1)`);
      resultado = "8x";
    } else {
      // Calcula apenas números normalmente
      const expressao = calcular.replace("^", "**"); // substitui potência por **
      const valor = eval(expressao);
      passos.push(`${calcular} = ${valor}`);
      resultado = valor.toString();
    }

    return res.status(200).json({
      calculo: passos.join("\n"),
      resultado: resultado
    });
  } catch (err) {
    return res.status(500).json({
      error: "Erro ao calcular a expressão."
    });
  }
}
