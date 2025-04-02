import Content from '@/components/content';
import { useEffect, useState } from 'react';

const url = import.meta.env.VITE_JSON_URL;

const Home: React.FC = () => {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch(`${url}/data/equipment.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados");
        }
        return response.json();
      })
      .then((data) => setDados(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <Content>
      <section>
        <main className="flex flex-col justify-center pt-6 gap-6">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-6">
              Lorem ipsum dolor sit amet {' '}
              <span className="text-primary">teste</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci accusantium esse eum, temporibus sunt necessitatibus numquam perspiciatis possimus deserunt voluptate dicta voluptas accusamus, corrupti debitis sint laboriosam! Ad, voluptatum!
            </p>
            <h1>Dados JSON</h1>
            <pre>{JSON.stringify(dados, null, 2)}</pre>
          </div>
        </main>
      </section>
    </Content>
  );
};
export default Home;
