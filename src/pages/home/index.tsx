import { useAppThemeContext } from "../../shared/contexts"

export default function Home() {
  const { toggleTheme } = useAppThemeContext();
  return (
    <span onClick={toggleTheme} style={{cursor: 'pointer'}}>Mudar o tema!</span>
  )
}