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
    diets: new Set()
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

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: validateTitle(value)
    }));
  };

  const handleSummaryChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      summary: validateSummary(value)
    }));
  };

  const handleImageChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: validateImageURL(value)
    }));
  };

  const handleHealthScoreChange = (event) => {
    const { name, value } = event.target;
    const floatValue = parseFloat(value);
  
    setInput((prevInput) => ({
      ...prevInput,
      [name]: isNaN(floatValue) ? 0 : floatValue
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      healthScore: validateHealthScore(floatValue)
    }));
  };

  const handleDiet = (event) => {
    const newDiet = event.target.value;

    setInput((prevInput) => ({
      ...prevInput,
      diets: prevInput.diets.add(newDiet)
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      diets: validateDiets([...input.diets, newDiet])
    }));
  };

  function handleStepChange (event, index) {
    const { name , value } = event.target;
    const list = [...stepList];
    list[index][name] = value;
    setStepList(list);
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
    const newDiets = new Set(input.diets);
    newDiets.delete(element);
  
    setInput((prevInput) => ({
      ...prevInput,
      diets: newDiets
    }));
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
          <div className={style.buttonContainer}>
            <Link to='/home' style={{ textDecoration: 'none' }}>
              <button className={style.goBackButton}>Go Back</button>
            </Link>
          </div>
        </div>
      <div className={style.bodyContainer}>
        <section className={style.formContainer}>
          <header>Add a new recipe!</header>
          <form onSubmit={(event) => handleSubmit(event)} className={style.formRecipe}>
          <div className={style.inputsContainer}>
          <div className={style.inputBox}>
            <div className={style.inputBox}>
              <label>Name</label>
              <input
                type='text'
                value={input.title}
                name='title'
                id='title'
                placeholder='Enter a new recipe...'
                onChange={handleTitleChange}
                className={style.inputText}
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
                    onChange={handleSummaryChange}
                    maxLength={maxDescriptionLength}
                    className={style.summaryText}
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
              <label>Image</label>
              <input
                type='text'
                value={input.image}
                name='image'
                placeholder='Enter an URL for image'
                onChange={handleImageChange}
                className={style.inputText}
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
                onChange={handleHealthScoreChange}
                className={style.inputText}
              />
            </div>
            <div className={style.selectBox}>
              <select onChange={(event) => handleDiet(event)}>
                <option hidden value="visualize">Select Diets...</option>
                {diets.map((diet) => (
                  <option value={diet.name} key={diet.id}>{diet.name}</option>
                ))}
              </select>
            </div>
            <div className={style.flexBox}>
               {errors.diets && <span className={style.errorMessage}>{errors.diets}</span>}
            </div>
            <div className={style.optionsContainer}>
                {Array.from(input.diets).map(diet =>
                <div className={style.optionsCard} onClick={() => handleDeleteDiet(diet)}>
                  <button type='button' className={style.optionsBtn}>{diet}</button>
                </div>
              )}
            </div>
          </div>
          <div className={style.inputBox}>
              <label className={style.stepsLabel}>Steps</label>
              {stepList.map((singleStep, index) => (
                <div key={index} className={style.stepsDiv}>
                  <input 
                  type='text' 
                  name='step'
                  placeholder='Enter a new step...' 
                  value={singleStep.step}
                  onChange={(event) => handleStepChange(event, index)}
                  className={style.stepInput}
                  />
                  {stepList.length > 1 && 
                  (
                    <button type='button'
                      onClick={() => handleStepRemove(index)}
                      className={style.buttonStyle}
                    >-</button>
                  )}
                  {stepList.length - 1 === index && stepList.length < 10 && 
                  (
                    <button type='button'
                      onClick={handleStepAdd}
                      className={style.buttonStyle}
                    >+</button>
                  )}
                </div>
              ))}           
          </div>
          <div className={style.flexBox}>
                    {errors.steps && <span className={style.errorMessage}>{errors.steps}</span>}
          </div>
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