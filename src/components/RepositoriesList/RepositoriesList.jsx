import React from "react";
import { useSelector } from "react-redux";

import { Loader } from "../Loader/Loader";

import { Repository } from "./Repository/Repository";
import { EmptyRepositories } from "./EmptyRepositories/EmptyRepositories";

import "./RepositoriesList.css";

export const RepositoriesList = () => {
  const repositories = useSelector((state) => state.repositories);
  const repositoriesCount = useSelector(
    (state) => state.user.publicRepositories
  );

  const isFetching = useSelector((state) => state.isFetching);

  if (isFetching) {
    return <Loader />;
  }

  if (repositories.length === 0) {
    return <EmptyRepositories />;
  }

  if (repositories.length > 0) {
    return (
      <div className="repositories">
        <div className="repositories-title">
          Repositories ({repositoriesCount})
        </div>
        <div className="repositories-grids">
          {repositories.map((rep) => (
            <Repository
              key={rep.id}
              name={rep.name}
              url={rep.url}
              description={rep.description}
            />
          ))}
        </div>
      </div>
    );
  }
};
