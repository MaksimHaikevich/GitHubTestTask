import React from "react";
import { useSelector } from "react-redux";

import { ProfileInfo } from "../ProfileInfo/ProfileInfo";
import { RepositoriesList } from "../RepositoriesList/RepositoriesList";
import { Loader } from "../Loader/Loader";
import { Pages } from "../RepositoriesList/Pages/Pages";

import { ContentState } from "./ContentStates/ContentState";

import "./Content.css";


const emptyContentImage = (
  <svg
    width="110"
    height="110"
    viewBox="0 0 110 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M46 35.5C46 30.2533 50.2533 26 55.5 26C60.7467 26 65 30.2533 65 35.5C65 40.7467 60.7467 45 55.5 45C50.2533 45 46 40.7467 46 35.5ZM55.5 17C45.2827 17 37 25.2827 37 35.5C37 45.7173 45.2827 54 55.5 54C65.7173 54 74 45.7173 74 35.5C74 25.2827 65.7173 17 55.5 17ZM32 87.5C32 74.5213 42.5213 64 55.5 64C68.4787 64 79 74.5213 79 87.5C79 89.9853 81.0147 92 83.5 92C85.9853 92 88 89.9853 88 87.5C88 69.5507 73.4493 55 55.5 55C37.5507 55 23 69.5507 23 87.5C23 89.9853 25.0147 92 27.5 92C29.9853 92 32 89.9853 32 87.5Z"
      fill="#808080"
    />
  </svg>
);
const initialContentImage = (
  <svg
    width="66"
    height="66"
    viewBox="0 0 66 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.4937 0.916748C13.7366 0.916748 0.916748 13.7366 0.916748 29.4937C0.916748 45.2508 13.7366 58.0707 29.4937 58.0707C35.9227 58.0707 41.8453 55.9147 46.6182 52.3235L58.2002 63.9021C58.9863 64.6881 60.0194 65.0834 61.0511 65.0834C62.0828 65.0834 63.1159 64.6881 63.902 63.902C65.4784 62.3256 65.4783 59.7766 63.902 58.2002L52.3235 46.6182C55.9147 41.8453 58.0707 35.9227 58.0707 29.4937C58.0707 13.7366 45.2508 0.916748 29.4937 0.916748ZM8.98141 29.4937C8.98141 18.1816 18.1816 8.98141 29.4937 8.98141C40.8058 8.98141 50.006 18.1816 50.006 29.4937C50.006 40.8058 40.8058 50.006 29.4937 50.006C18.1816 50.006 8.98141 40.8058 8.98141 29.4937Z"
      fill="#808080"
    />
  </svg>
);

export const Content = () => {
  const user = useSelector((state) => state.user);
  const repoCount = useSelector((state) => state?.user?.publicRepositories);
  const isFetching = useSelector((state) => state.isFetching);
  const statusMessage = useSelector((state) => state.statusMessage);

  if (isFetching) {
    return <Loader />;
  }

  if (!user) {
    return (
      <ContentState
        image={initialContentImage}
        text="Start with searching a GitHub user"
      />
    );
  }

  if (statusMessage === "error") {
    return <ContentState image={emptyContentImage} text="User not found" />;
  }

  if (user && !isFetching) {
    return (
      <>
        <div className="content">
          <div className="main-content">
            <ProfileInfo
              avatar={user.avatar}
              name={user.name}
              url={user.url}
              login={user.login}
              followersCount={user.followersCount}
              followingCount={user.followingCount}
            />
            <RepositoriesList />
          </div>
        </div>
        {repoCount && <Pages repoCount={repoCount} />}
      </>
    );
  }
};
