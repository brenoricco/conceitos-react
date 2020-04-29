import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const repository = await api.post("/repositories", {
      title: "Novo Repositorio ",
      url: "https://github.com/Rocketseat/gostack-template-conceitos-nodejs",
      techs: ["VueJS", "AdonisJs"],
      likes: 0,
    });

    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repository = repositories.find((repository) => repository.id === id);

    setRepositories(repositories.filter((r) => r !== repository));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
