export const Environment = {
    /**
     * Define o titulo padrão da página
     */
    DEFAULT_TITLE: 'Cris Thomazi Boutique',
    /**
     * Define o alerta padrão para função não implementadas
     */
    NOT_IMPLEMENTED_MESSAGE: 'Função ainda não implementada.',
    /**
     * Define a descrição padrão da página
     */
    DEFAULT_DESCRIPTION: 'Bem vindo a CrisThomazi Boutique',
    /**
     * Gera a mensagem de descrição do produto para a tag meta
     */
    CUSTOM_DESCRIPTION: (title: string) => `Confira ${title} na CrisThomazi Boutique.`,
    /**
     * Define a mensagem para produto não encontrado
     */
    DEFAULT_NOT_FOUND_MESSAGE: 'Não encontramos produtos para exibir.',
    /**
     * Informações básicas da loja
     */
    INFORMATION_BASE: {
        /**
         * Telefone atual da loja no formato (xx) xxxxx-xxxx
         */
        BASE_TELL: '(38) 99732-6440',
        /**
        * Url base para enviar mensagem para o Whats da loja, incluir o texto da mensagem
        */
        BASE_URL_WHATSAPP: (message: string) => `https://api.whatsapp.com/send?phone=553897326440&text=${message}`,
        /**
         * Url base para para o IG, e usuário do IG da loja
         */
        BASE_INSTAGRAM: {
            url: 'https://www.instagram.com/cristhomaziboutique/',
            user: '@cristhomaziboutique'
        },
    }
}