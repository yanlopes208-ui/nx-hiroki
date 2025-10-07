const { evaluate, simplify, parse } = require("mathjs");

module.exports = async (req, res) => {
  try {
    const { calcular } = req.query;

    if (!calcular) {
      return res.status(400).json({
        error: "Use ?calcular=expressão (ex: ?calcular=sqrt(9)+2^3)"
      });
    }

    const seguro = /^[0-9xX+\-*/^().\s√a-zA-Z]+$/.test(calcular);
    if (!seguro) {
      return res.status(400).json({
        error: "Expressão inválida! Use apenas números, letras, √ e operadores."
      });
    }

    const expr = parse(calcular.replace(/√/g, "sqrt"));
    const simplificado = simplify(expr).toString();
    const resultado = evaluate(expr);

    return res.status(200).json({
      expressao: calcular,
      simplificado,
      resultado
    });
  } catch (err) {
    return res.status(500).json({
      error: "Erro ao processar a equação.",
      detalhe: err.message
    });
  }
};
