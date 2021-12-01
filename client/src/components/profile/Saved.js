import React, { useState, useEffect } from "react";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getDataAPI } from "../../utils/fetchData";
import PostThumb from "../PostThumb";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI("getSavePosts", auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      });
    return () => setSavePosts([]);
  }, [auth, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token);
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };
  return (
    <div>
      <PostThumb posts={savePosts} result={result} />
      {load && <img alt="loading" src={LoadIcon} className="d-block mx-auto" />}
      <LoadMoreBtn
        result={result}
        page={page}
        laod={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Saved;
