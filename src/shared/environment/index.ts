const installment = (price: number) => {
    const parcelValue = [
        {
            quantidade: 2,
            valorMinimo: 100
        },
        {
            quantidade: 3,
            valorMinimo: 200
        },
        {
            quantidade: 4,
            valorMinimo: 300
        },
        {
            quantidade: 5,
            valorMinimo: 400
        },
        {
            quantidade: 6,
            valorMinimo: 500
        }
    ]
    const response = {
        quantidade: 1,
        parcela: price
    }
    for (const item of parcelValue) {
        if (price >= item.valorMinimo) {
            response.quantidade = item.quantidade;
            response.parcela = price / item.quantidade;
        } else break;
    }
    return response;
}

export const Environment = {
    /**
     * Retorna o titulo padrão da página
     */
    DEFAULT_TITLE: 'Cris Thomazi Boutique',
    /**
     * Retorna a mensagem padrão para função não implementada
     */
    NOT_IMPLEMENTED_MESSAGE: 'Função ainda não implementada.',
    /**
     * Retorna a descrição padrão da página
     */
    DEFAULT_DESCRIPTION: 'Bem vindo a CrisThomazi Boutique',
    /**
     * Gera a mensagem de descrição do produto para a tag meta
     */
    CUSTOM_DESCRIPTION: (title: string) => `Confira ${title} na CrisThomazi Boutique.`,
    /**
     * Retorna a mensagem padrão para produto não encontrado
     */
    DEFAULT_NOT_FOUND_MESSAGE: 'Não encontramos produtos para exibir.',
    /**
     * Informações básicas da loja
     * 
     * @BASE_TELL Telefone atual da loja no formato (xx) xxxxx-xxxx
     * 
     * @BASE_URL_WHATSAPP Url base para enviar mensagem para o Whats da loja, incluir o texto da mensagem
     * 
     * @BASE_INSTAGRAM Url base para para o IG, e usuário do IG da loja
     * 
     * @CNPJ Cnpj da loja no formato ##.###.###/####-## 
     * 
     * @EMAIL E-mail da loja
     * 
     * @SOCIAL_NAME Razão social
     */
    INFORMATION_BASE: {
        BASE_TELL: '(38) 99732-6440',
        BASE_URL_WHATSAPP: (message: string) => `https://api.whatsapp.com/send?phone=553897326440&text=${message}`,
        BASE_INSTAGRAM: {
            url: 'https://www.instagram.com/cristhomaziboutique/',
            user: '@cristhomaziboutique'
        },
        CNPJ: '32.291.204/0001-15',
        EMAIL: 'cristhomazi07@gmail.com',
        SOCIAL_NAME: 'Cris Thomazi Multimarcas LTDA'
    },
    /**
     * Retorna a quantidade de parcelas possíveis para dividir o valor, e o valor da parcelas
     */
    CALCULATE_INSTALLMENT: installment,
}