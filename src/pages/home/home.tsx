import { useAppThemeContext } from '../../shared/contexts'
import { BaseLayout } from '../../shared/layout';

export const Home: React.FC = () => {
  const { toggleTheme } = useAppThemeContext();

  return (
    <BaseLayout title='Home' >
      <span onClick={toggleTheme} style={{ cursor: 'pointer' }}>Mudar o tema!</span>
    </BaseLayout>
  )
}