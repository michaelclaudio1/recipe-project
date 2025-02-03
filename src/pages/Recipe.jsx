import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const navigate = useNavigate();

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();

    setDetails(detailData);
  }

  useEffect(() => {
    fetchDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
        {activeTab === 'instructions' && (
          <div>
            {/* SOMETIMES, THE RECIPES COME IN AN ENUMERATED LIST. THE FOLLOWING LINE MAKES
                IT SO THE TEXT DOESN'T DISPLAY <ol><li>Sample Text</ol></li>
            */}
            <p dangerouslySetInnerHTML={{ __html: details.instructions }} />
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return (
                <li key={ingredient.id}>
                  {ingredient.original}
                </li>
              );
            })}
          </ul>
        )}
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    line-height: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe