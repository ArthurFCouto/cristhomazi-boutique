interface ITamanhoCor {
    tamanho: string;
    cor: string[];
    
}

export interface IDatabase {
    id: number;
    produto: {
        id: number;
        sku: string;
        titulo: string;
        categoria: string[];
    };
    tamanhoCor: ITamanhoCor[];
    valor: number;
    descricao: string;
    imagens: string[];
}

export default [
    {
        'id': 1,
        'produto': {
            'id': 1,
            'sku': 'CJOA',
            'titulo': 'Calça de linho Joana',
            'categoria': [
                'calças',
                'roupas'
            ],
        },
        'tamanhoCor': [
            {
                'tamanho': 'P',
                'cor': [
                    'nude',
                    'roxo simples'
                ]
            },
            {
                'tamanho': 'M',
                'cor': [
                    'nude',
                ]
            },
            {
                'tamanho': 'G',
                'cor': [
                    'nude',
                    'roxo simples'
                ]
            }
        ],
        'valor': 159.9,
        'descricao': 'A modelo está vestindo tamanho P. Ela tem 1,65m de altura. Veste P na parte superior e 38/40 na parte inferior. Ela tem 106cm de quadril, 69cm de cintura e 88cm de busto.',
        'imagens': [
            'https://54325.cdn.simplo7.net/static/54325/sku/roupas-calcas-calca-de-linho-joana-p-1674506551553.jpeg',
            'https://54325.cdn.simplo7.net/static/54325/sku/roupas-calcas-calca-de-linho-joana-p-1674762305153.jpeg',
            'https://54325.cdn.simplo7.net/static/54325/sku/roupas-calcas-calca-de-linho-joana--p-1665437883307.jpeg'

        ]
    },
    {
        'id': 2,
        'produto': {
            'id': 1,
            'sku': 'CLME',
            'titulo': 'CALÇA MOM ESCURA',
            'categoria': [
                'calças',
                'roupas'
            ],
        },
        'tamanhoCor': [
            {
                'tamanho': '40',
                'cor': [
                    'default'
                ]
            },
            {
                'tamanho': '42',
                'cor': [
                    'default',
                ]
            },
            {
                'tamanho': '36',
                'cor': []
            },
            {
                'tamanho': '38',
                'cor': [
                    'default'
                ]
            }

        ],
        'valor': 179.9,
        'descricao': 'A modelo está vestindo tamanho 40. Ela tem 1,65m de altura. Veste P na parte superior e 38/40 na parte inferior. Ela tem 106cm de quadril, 69cm de cintura e 88cm de busto.',
        'imagens': [
            'https://54325.cdn.simplo7.net/static/54325/sku/roupas-calcas-calca-mom-escura--p-1674506838811.jpeg',
            'https://54325.cdn.simplo7.net/static/54325/sku/roupas-calcas-calca-mom-escura--p-1673294384356.jpeg',
            'https://54325.cdn.simplo7.net/static/54325/sku/roupas-calcas-calca-mom-escura--p-1673294384356.jpeg'
        ]
    },
    {
        'id': 3,
        'produto': {
            'id': 3,
            'sku': 'ONSHLCB',
            'titulo': 'SHORT DUNA THEODORA',
            'categoria': [
                'shorts',
                'roupas'
            ],
        },
        'tamanhoCor': [
            {
                'tamanho': 'P',
                'cor': [
                    'preto',
                    'verde limão',
                    'laranja neon',
                    'funcsia'
                ]
            },
            {
                'tamanho': 'M',
                'cor': [
                    'preto',
                    'laranja neon',
                    'funcsia'
                ]
            },
            {
                'tamanho': 'G',
                'cor': [
                    'verde limão'
                ]
            },

        ],
        'valor': 99.9,
        'descricao': 'A modelo está vestindo tamanho P. Ela tem 1,65m de altura. Veste P na parte superior e 38/40 na parte inferior. Ela tem 106cm de quadril, 69cm de cintura e 88cm de busto.',
        'imagens': [
            'https://54325.cdn.simplo7.net/static/54325/sku/roupas-shorts-short-duna-theodora-p-1673899081929.jpeg',
            'https://54325.cdn.simplo7.net/static/54325/sku/roupas-shorts-short-duna-theodora-p-1673896105825.jpeg'
        ]
    },
] as IDatabase[];