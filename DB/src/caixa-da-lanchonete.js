const CARDAPIO = [
    { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
    { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
    { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
    { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
    { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
    { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
    { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
    { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
];

const FORMAS_DE_PAGAMENTO = ['dinheiro', 'debito', 'credito'];
class CaixaDaLanchonete {

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!FORMAS_DE_PAGAMENTO.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        let temPrincipal = false;

        for (const itemString of itens) {
            const [codigo, quantidade] = itemString.split(',');
            const itemMenu = CARDAPIO.find(menuItem => menuItem.codigo === codigo);

            if (!itemMenu) {
                return 'Item inválido!';
            }

            const itemValor = itemMenu.valor * parseInt(quantidade);

            if (itemMenu.codigo.includes("combo")) {
                total += itemValor;
            } else if (itemMenu.extra) {
                if (!temPrincipal) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
                total += itemValor;
            } else {
                temPrincipal = true;
                total += itemValor;
            }
        }

        if (!temPrincipal) {
            return 'Não há itens principais no pedido!';
        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === 'credito') {
            total *= 1.03; // Aplicar acréscimo de 3% para pagamento no crédito
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

module.exports = CaixaDaLanchonete;

export { CaixaDaLanchonete };