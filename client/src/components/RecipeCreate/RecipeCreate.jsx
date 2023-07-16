import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from '../../actions/index';
import { validateTitle, validateSummary, validateSteps, validateDiets, validateImageURL, validateHealthScore } from '../../helpers/validaciones';
import { useDispatch, useSelector } from 'react-redux';
import style from './RecipeCreate.module.css';

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);

  const [stepList, setStepList] = useState([
    { step: "" },
  ])

  console.log(stepList);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    image: "",
    healthScore: 1,
    steps:[],
    diets: []
  });

  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    image: "",
    healthScore: 1,
    steps:[],
    diets: []
  });

  const [descriptionLength, setDescriptionLength] = useState(0);
  const maxDescriptionLength = 255;

  function handleStepChange (event, index) {
    const { name , value } = event.target;
    const list = [...stepList];
    list[index][name] = value;
    setStepList(list);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "healthScore") {
      const floatValue = parseInt(value);

      if (!isNaN(floatValue)) {
        setInput({
          ...input,
          [name]: floatValue,
        });
        return;
      }
    }

    if (name === "summary") {
      setDescriptionLength(value.length);
    }

    setInput({
      ...input,
      [name]: value,
    });
  }

  function handleDiet(event) {
    const newDiet = {
      name: event.target.value
    };
    setInput({
      ...input,
      diets: [...input.diets, newDiet]
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fieldErrors = {
      title: validateTitle(input.title),
      image: validateImageURL(input.image),
      summary: validateSummary(input.summary),
      healthScore: validateHealthScore(input.healthScore),
      diets: validateDiets(input.diets)
    };

    setErrors(fieldErrors);

    const hasErrors = Object.values(fieldErrors).some((error) => error !== "");
    if (hasErrors) {
      return;
    }

    const steps = stepList.map((stepObj) => stepObj.step);
    const dietsNames = input.diets.map(diet => diet.name)

    const updatedInput = {
      ...input,
      steps: steps,
      diets: dietsNames
    };

    console.log(updatedInput);

    dispatch(postRecipe(updatedInput));
    alert('Recipe Created Successfully');
    setInput({
      title: "",
      summary: "",
      image: "",
      healthScore: 1,
      steps:[],
      diets: []
    });
    history.push('/home');
  }

  function handleDeleteDiet(element) {
    setInput({
      ...input,
      diets: input.diets.filter(diet => diet !== element)
    });
  }

  function handleStepAdd() {
    setStepList([...stepList, {step: "" }])
  }

  function handleStepRemove(index) {
    const step = [...stepList]
    step.splice(index, 1);
    setStepList(step);
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={style.container}>
        <div className={style.divButton}>
          <Link to='/home' style={{ textDecoration: 'none' }}>
            <button className={style.goBackButton}>Go Back</button>
          </Link>
        </div>
      <div className={style.bodyContainer}>
        <section className={style.formContainer}>
          <header>Add a new recipe!</header>
          <form onSubmit={(event) => handleSubmit(event)} className={style.formGame}>
            <div className={style.inputBox}>
              <label>Name</label>
              <input
                type='text'
                value={input.title}
                name='title'
                id='title'
                placeholder='Enter a new recipe...'
                onChange={(event) => handleChange(event)}
              />
              {errors.title && <span className={style.errorMessage}>{errors.title}</span>}
            </div>
            <div className={style.descriptionBody}>
                <div className={style.descriptionWrapper}>
                <label>Summary</label>
                <textarea
                    value={input.summary}
                    name='summary'
                    id='summary'
                    placeholder='Enter a summary...'
                    onChange={(event) => handleChange(event)}
                    maxLength={maxDescriptionLength}
                />
                <span className={style.descriptionLength}>
                    {`${descriptionLength}/${maxDescriptionLength}`}
                </span>
                </div>
                <div className={style.flexBox}>
                    {errors.summary && <span className={style.errorMessage}>{errors.summary}</span>}
                </div>
            </div>
            <div className={style.inputBox}>
              <label>Steps</label>
              {stepList.map((singleStep, index) => (
                <div key={index}>
                  <input 
                  type='text' 
                  name='step'
                  placeholder='Enter a new step...' 
                  value={singleStep.step}
                  onChange={(event) => handleStepChange(event, index)}
                  />
                  {stepList.length - 1 === index && stepList.length < 4 && 
                  (
                    <button type='button'
                      onClick={handleStepAdd}
                    >+</button>
                  )}
                  {stepList.length > 1 && 
                  (
                    <button type='button'
                      onClick={() => handleStepRemove(index)}
                    >x</button>
                  )}
                </div>
              ))}
              {/* {errors.title && <span className={style.errorMessage}>{errors.title}</span>} */}
            </div>
            <div className={style.inputBox}>
              <label>Image</label>
              <input
                type='text'
                value={input.image}
                name='image'
                placeholder='Enter an URL for image'
                onChange={(event) => handleChange(event)}
              />
              {errors.image && <span className={style.errorMessage}>{errors.image}</span>}
            </div>
            <div className={style.inputBox}>
              <label>HealthScore</label>
              <input
                type="number"
                step="1"
                lang="en"
                min="1"
                max="100"
                value={input.healthScore}
                name='healthScore'
                onChange={(event) => handleChange(event)}
              />
            </div>
            <div className={style.selectBox}>
              <select onChange={(event) => handleDiet(event)}>
                <option hidden value="visualize">Select Diets...</option>
                <option value="gluten free">gluten free</option>
                <option value="paleolithic">paleolithic</option>
                <option value="primal">primal</option>
                <option value="vegetarian">vegetarian</option>
                {diets.map((diet) => (
                  <option value={diet.name} key={diet.id}>{diet.name}</option>
                ))}
              </select>
            </div>
            <div className={style.flexBox}>
               {errors.diets && <span className={style.errorMessage}>{errors.diets}</span>}
            </div>
            <div className={style.optionsContainer}>
              {input.diets.map(el =>
                <div className={style.optionsCard} onClick={() => handleDeleteDiet(el)}>
                  <button type='button' className={style.optionsBtn}>{el.name}</button>
                </div>
              )}
            </div>
            <div className={style.buttonContainer}>
              <button type='submit' className={style.submitButton}>Create Recipe</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}