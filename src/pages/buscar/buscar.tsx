import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { BaseLayout } from '../../shared/layout';
import { Breadcrumbs, MCardArea } from '../../shared/components';
import { IProduto, ProdutoService } from '../../shared/service';
import { useDialogContext } from '../../shared/contexts';

export const Buscar: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { categoria } = useParams();
    const { showAlert } = useDialogContext();
    const [loading, setLoading] = useState(true);
    const [produtos, setProdutos] = useState<IProduto[]>([]);

    const search = useMemo(() => searchParams.get('busca'), [searchParams]);

    useEffect(() => {
        setLoading(true);
        setProdutos([]);
        ProdutoService.getAllWithFilter(search || '', categoria || '', 'valor', 'asc')
            .then((response) => setProdutos(response.list))
            .catch((error) => showAlert(error.customMessage, 'error'))
            .finally(() => setLoading(false));
    }, [categoria, search]);

    return (
        <BaseLayout title='Cris Thomazi Boutique' showCategories showSearch>
            <Breadcrumbs />
            <MCardArea list={produtos} isLoading={loading} />
        </BaseLayout>
    )
}