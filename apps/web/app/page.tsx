import { auth } from '../auth';
import HomePage from './_components/HomePage';

export default function Page(): JSX.Element {
  return (
    <main className="h-screen w-full">
      <HomePage />
    </main>
  );
}
