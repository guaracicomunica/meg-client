import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { options } from '../../utils/defaultToastOptions';
import { DraftDataForm, DataFormClass } from '../../types/Class';

import styles from './styles.module.css';
import { FontContext } from '../../contexts/FontContext';
import { ThemeContext } from '../../contexts/ThemeContext';

type ModalCreateNewClassType = {
  type: string;
  formData?: DraftDataForm;
  show: boolean;
  onHide: () => void;
}

type PreviewObjectType = {
  index: number;
  path: string;
}

export default function ModalCreateNewClass(props: ModalCreateNewClassType) {
  const { register, handleSubmit, setValue } = useForm({defaultValues: {
    name: "",
    nickname: "",
    partners: [],
    skills: [],
    levels: [],
    file: null,
  }});

  const onSubmit = async (data: DataFormClass) => {
    await handleCreateClass(data);
  };

  const router = useRouter();
  const [isSkillStoreEnabled, setIsSkillStoreEnabled] = useState(false);
  const [skillInputs, setSkillInputs] = useState([]);
  const [levelInputs, setLevelInputs] = useState([ ]);
  const [isDraft, setIsDraft] = useState(1);
  const [idClass, setIdClass] = useState(0);
  const [srcPreviewBanner, setSrcPreviewBanner] = useState("");
  const [srcPreviewLevels, setSrcPreviewLevels] = useState<PreviewObjectType[]>([]);
  const [srcPreviewSkills, setSrcPreviewSkills] = useState<PreviewObjectType[]>([]);
  const { font } = useContext(FontContext);
  const { theme, isHighContrast } = useContext(ThemeContext);
  const isLargeFont = font >= 3;

  //modal edit class
  useEffect(() => {
    if (props.formData) {
      setIdClass(props.formData.id);
      setValue('name', props.formData.name);
      setValue('nickname', props.formData.nickname);

      if (props.formData.file) {
        setSrcPreviewBanner(props.formData.file);
      }

      if (props.formData.partners) {
        setValue('partners.0', props.formData.partners[0]);
      }

      if (props.formData.skills) {
        setIsSkillStoreEnabled(true);
        setSkillInputs(props.formData.skills);
        
        const prs = props.formData.skills.map((item, index) => {
          return {
            index: index,
            path: item.path
          }
        })

        setSrcPreviewSkills(prs);
      }

      if (props.formData.levels.length > 0) {
        setLevelInputs(props.formData.levels);
        
        const prl = props.formData.levels.map((item, index) => {
          return {
            index: index,
            path: item.path
          }
        })

        setSrcPreviewLevels(prl);
      }
    }
  }, [props.formData]);

  function addLevel() {
    const input = {
    //  id: levelInputs.length > 0 ? levelInputs.length + 1 : 0,
      xp: null,
      name: null,
      path: null,
    };
    setLevelInputs([...levelInputs, input]);
    setValue('levels', levelInputs);
  }

  function deleteLevelInState(idLevel: number, indexPreview?: number) {
    const newLevelInputs = levelInputs.filter((level, index) => {
      if (index !== idLevel) {
        return level;
      }
    });
    setLevelInputs(newLevelInputs);
    setValue('levels', newLevelInputs);

    if (indexPreview) {
      const newPreviewLevels = srcPreviewLevels.filter((level, index) => {
        if (index !== indexPreview) {
          return level;
        }
      });
      setSrcPreviewLevels(newPreviewLevels);
    }
  }

  async function deleteLevel(idLevel: number, indexPreview: number) {
    if (props.type === "edit" && idLevel !== undefined) {
      try {
        const { 'meg.token': token } = parseCookies();
        await api.delete(`classes/${props.formData.id}/level/${idLevel}/remove`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(function (success) {
          toast.success("Nível excluído com sucesso!", options);
          deleteLevelInState(idLevel, indexPreview);
        });
      } catch(error) {
        const string = "Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.";

        if (!error.response) {
          // network error
          return toast.error(string, options);
        }
        switch (error.response.status) {
          case 401:
            return {
              redirect: {
                destination: '/sessao-expirada',
                permanent: false,
              }
            }

          case 403:
            return {
              redirect: {
                destination: '/acesso-negado',
                permanent: false,
              }
            }

          case 400:
            toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : string, options);
            break;

          case 422:
            let errors = error.response?.data.errors;
            Object.keys(errors).forEach((item) => {
              toast.warning(errors[item][0], options);
            });
            break;

          case 500: 
            toast.error(string, options);
            break;

          default:
            toast.error(string, options);
            break;
        }
      }
    }
    else {
      deleteLevelInState(idLevel, indexPreview);
    }
  }

  function addSkill() {
    const input = {
      coins: null,
      name: null,
      path: null,
    }
    const inputImg = {
      index: srcPreviewSkills.length > 0 ? srcPreviewSkills.length : 0,
      path: null,
    }
    setSkillInputs([...skillInputs, input]);
    setSrcPreviewSkills([...srcPreviewSkills, inputImg]);
    setValue('skills', skillInputs);
  }

  function deleteSkillInState(idSkill: number, indexPreview?: number) {
    const newSkillInputs = skillInputs.filter((skill, index) => {
      if (index !== idSkill) {
        return skill;
      }
    });

    if (indexPreview) {
      const newPreviewSkills = srcPreviewSkills.filter((skill, index) => {
        if (index !== indexPreview) {
          return skill;
        }
      });
      setSrcPreviewSkills(newPreviewSkills);
    }
    setSkillInputs(newSkillInputs);
    setValue('skills', newSkillInputs);
  }

  async function deleteSkill(idSkill: number, indexPreview: number) {
    if (props.type === "edit" && idSkill !== undefined) {
      try {
        const { 'meg.token': token } = parseCookies();
        await api.delete(`classes/${props.formData.id}/skill/${idSkill}/remove`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(function (success) {
          toast.success("Habilidade excluída com sucesso!", options);
          deleteSkillInState(idSkill, indexPreview);
        });
      } catch(error) {
        const string = "Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.";

        if (!error.response) {
          // network error
          return toast.error(string, options);
        }
        switch (error.response.status) {
          case 401:
            return {
              redirect: {
                destination: '/sessao-expirada',
                permanent: false,
              }
            }

          case 403:
            return {
              redirect: {
                destination: '/acesso-negado',
                permanent: false,
              }
            }

          case 400:
            toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : string, options);
            break;

          case 422:
            let errors = error.response?.data.errors;
            Object.keys(errors).forEach((item) => {
              toast.warning(errors[item][0], options);
            });
            break;

          case 500: 
            toast.error(string, options);
            break;

          default:
            toast.error(string, options);
            break;
        }
      }
    }
    else {
      deleteSkillInState(idSkill, indexPreview);
    }
    
  }

  function enableSkillStore(isEnabled: boolean) {
    if (isEnabled) {
      setIsSkillStoreEnabled(true);
      addSkill();
    }
    else {
      setIsSkillStoreEnabled(false);
      setSkillInputs([]);
    }
  }

  function uploadFile(e: React.ChangeEvent<HTMLDivElement>) {
    //change span text and preview image selected
    const fileSelected = e.currentTarget.querySelector<HTMLInputElement>(".input-file input").files;
    const previewImage = e.currentTarget.querySelector<HTMLImageElement>(".preview-image img");

    if (fileSelected.length > 0) {
      e.currentTarget.querySelector<HTMLSpanElement>(".input-file span").innerText = "Alterar capa";
      previewImage.src = URL.createObjectURL(fileSelected[0]);
      previewImage.style.display = 'block';
    }
    else {
      e.currentTarget.querySelector("span").innerText = "Defina capa";
    }
  }

  function closeModal() {
    props.onHide();
  }

  function generateFormData(data: DataFormClass) {
    const form = new FormData();
    form.append('id', idClass.toString());
    form.append('name', data.name);
    form.append('nickname', data.nickname);
    form.append('is_draft', isDraft.toString());

    if (data.levels && data.levels.length > 0) {
      if (data.levels[0].name != undefined && data.levels[0].xp != undefined && data.levels[0].file != undefined) {
        for (let i = 0; i < data.levels.length; i++) {
          if(data.levels[i].id != undefined) form.append(`levels[${i}][id]`, data.levels[i].id.toString());
          form.append(`levels[${i}][name]`, data.levels[i].name);
          form.append(`levels[${i}][xp]`, data.levels[i].xp.toString());
          if (data.levels[i].file[0] != undefined) {
            form.append(`levels[${i}][file]`, data.levels[i].file[0]);
          }
        }
      }
    }

    if(data.skills && data.skills.length > 0) {
      if (
        data.skills[0].name != undefined 
        && data.skills[0].coins != undefined 
        && data.skills[0].file != undefined) 
        {
        for (let i = 0; i < data.skills.length; i++) {
          if(data.skills[i].id != undefined) form.append(`skills[${i}][id]`, data.skills[i].id.toString());
          form.append(`skills[${i}][name]`, data.skills[i].name);
          form.append(`skills[${i}][coins]`, data.skills[i].coins.toString());
          if (data.skills[i].file[0] != undefined) {
            form.append(`skills[${i}][file]`, data.skills[i].file[0]);
          }
        }
      }
    }

    if (data.file && data.file[0] != undefined) {
      form.append('file', data.file[0]);
    }

    if (data.partners[0] != "") {
      form.append('partners[0]', data.partners[0]);
    }
    
    return form;
  }

  async function handleCreateClass(data: DataFormClass) {
    const request = generateFormData(data);

    try {
      const { 'meg.token': token } = parseCookies();
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      await api.post('classes', request)
      .then(function (success) {
        if (props.type === "create") {
          toast.success("Turma criada com sucesso!", options);
        }
        else {
          toast.success("Turma editada com sucesso!", options);
        }
        props.onHide();
        router.push('/turmas', undefined, {scroll: false});
      });
    }
    catch(error) {
      const string = "Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.";

      if (!error.response) {
        // network error
        return toast.error(string, options);
      }
      switch (error.response.status) {
        case 401:
          return {
            redirect: {
              destination: '/sessao-expirada',
              permanent: false,
            }
          }
        case 400:
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : string, options);
          break;

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });
          break;

        case 500: 
          toast.error(string, options);
          break;

        default:
          toast.error(string, options);
          break;
      }
    }
  }

  const handleChange = ({ target: { name, value } }) => {
    const indexLevelAndSkills = [
      { value: 'skills', begin: 7 },
      { value: 'levels', begin: 7 },
    ] //valor onde se vai pegar o index

    if(name.split('.')[0] === indexLevelAndSkills[1].value){

      const keyNameInput: string = name.substring(indexLevelAndSkills[1].begin + 2, name.length);

      const index: number = parseInt(name.substring(indexLevelAndSkills[1].begin, indexLevelAndSkills[1].begin + 1));
      
      const levels = [...levelInputs];

      const oldLevel = levels[index];

       const input = {
         //id: oldLevel.id,
         xp: keyNameInput == "xp" ? parseInt(value) : oldLevel.xp,
         name: keyNameInput == "name" ? value : oldLevel.name,
         path: keyNameInput == "file" ? value : oldLevel.path,
       }

       levels[index] = input;
       
       setLevelInputs(levels);

    }else if(name.split('.')[0] === indexLevelAndSkills[0].value){

      const keyNameInputSkill: string = name.split('.')[2];

      const idOfSkill: number = parseInt(name.split('.')[1]);
      
      const skills = [...skillInputs];

      const skillsImg = [...srcPreviewSkills];

      const oldSkill = skills[idOfSkill];
      
      const oldSkillImg = skillsImg[idOfSkill];

       const inputSkill = { 
         //id: oldLevel.id,
         xp: keyNameInputSkill == "coins" ? parseInt(value) : (oldSkill.coins ?? 0),
         name: keyNameInputSkill == "name" ? value : oldSkill.name,
         path: keyNameInputSkill == "file" ? value : oldSkill.path,
       }
       let inputSkillImg = oldSkillImg;
       if(keyNameInputSkill == "file") {
        inputSkillImg = {
          index: oldSkillImg.index,
          path: value,
        }
       }

       skills[idOfSkill] = inputSkill;
       skillsImg[idOfSkill] = inputSkillImg;

       setSrcPreviewSkills(skillsImg);

       setSkillInputs(skills);
       
    }

  }; 


  return (
    <Modal
      id="modal-add-class-teacher"
      show={props.show}
      onHide={props.onHide}
      size={isLargeFont ? "xl" : "lg"}
      aria-labelledby="modal-title"
      centered
      className={`modal-style bg-${theme} font-${font}`}
      backdrop="static"
    >
      <Modal.Header className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          {props.type === "create" ? "Criar nova turma" : "Editar turma"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <form
          autoComplete='off'
          id="create-class"
          onSubmit={handleSubmit(onSubmit)}
          method='post'
          encType='multipart/form-data'
        >
          <h4>Informações da turma</h4>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-input w-100"
              name="name"
              placeholder="Nome da turma"
              {...register('name')}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-input w-100"
              name="nickname"
              placeholder="Nome da sala"
              {...register('nickname')}
            />
          </div>
          <div onChange={uploadFile}>
            <div className="input-file">
              <input
                type="file"
                id="file"
                name="file"
                accept=".png, .jpg, .jpeg, .svg, .gif"
                {...register('file')}
              />
              <label htmlFor="file">
                <img
                  src="./icons/camera.svg"
                  alt="Adicionar imagem"
                  className={isHighContrast ? "img-contrast-white" : ""}
                />
              </label>
              <span>Defina uma capa</span>
            </div>
            <div className='preview-image'>
              <img
                src={srcPreviewBanner ?? "#"}
                style={{display: srcPreviewBanner ? "block" : "none"}}
                id="preview-banner"
                alt="Preview da imagem selecionada"
              />
            </div>
          </div>

          <hr className="my-4" />

          <div className='d-flex flex-wrap justify-content-center justify-content-lg-start'>
            <strong style={!isHighContrast ? {color: "var(--gray-title)"} : {}} className="mt-2">
              Deseja criar uma loja de Habilidades para essa turma?
            </strong>
            <div className="form-group form-check-inline m-0 mt-2">
              <div className='d-flex'>
                <div className="radio">
                  <input
                    type="radio"
                    id="enable-skill-store"
                    name="skill-store"
                    onChange={() => enableSkillStore(true)}
                    defaultChecked={isSkillStoreEnabled}
                  />
                  <label htmlFor="enable-skill-store"> </label>
                </div>
                <span>Sim</span>
              </div>
              
              <div className='d-flex'>
                <div className="radio">
                  <input
                    type="radio"
                    id="unable-skill-store"
                    name="skill-store"
                    onChange={() => enableSkillStore(false)}
                    defaultChecked={!isSkillStoreEnabled}
                  />
                  <label htmlFor="unable-skill-store"> </label>
                </div>
                <span>Não</span>
              </div>
            </div>
          </div>

          {isSkillStoreEnabled && (
            <>
              <hr className="my-4" />

              <h4>Loja de habilidades</h4>

              <div id="form-skills">
                {skillInputs.map((input, i) => {
                  return (
                    <div className="form-row" key={`input-skill-${i}`}>
                      <div className="form-group col-lg-4">
                        <input 
                          type="hidden" 
                          name={`skills[${i}][id]`} 
                          defaultValue={input.id} 
                          {...register(`skills.${i}.id`)}
                          onChange={handleChange}
                        />

                        <input
                          type="text"
                          className="form-control form-input"
                          name={`skills[${i}][name]`}
                          placeholder="Nome da habilidade"
                          {...register(`skills.${i}.name`)}
                          defaultValue={input.name}
                          onChange={handleChange}
                        />
                      </div>
            
                      <div className="form-group col-lg-4">
                        <input
                          type="number"
                          min={1}
                          className="form-control form-input"
                          name={`skills[${i}][coins]`}
                          placeholder="Valor da habilidade"
                          {...register(`skills.${i}.coins`)}
                          defaultValue={input.coins}
                          onChange={handleChange}
                        />
                      </div>
            
                      <div className='form-group col-lg-4 small-preview' onChange={uploadFile}>
                        <div className="input-file">
                          <input
                            type="file"
                            name={`skills[${i}][file]`}
                            id={`skills[${i}][file]`}
                            accept=".png, .jpg, .jpeg, .svg"  
                            {...register(`skills.${i}.file`)}
                            onChange={handleChange}
                          />
                          <label htmlFor={`skills[${i}][file]`}>
                            <img
                              src="./icons/camera.svg"
                              alt="Adicionar imagem"
                              className={isHighContrast ? "img-contrast-white" : ""}
                            />
                          </label>
                          <span>Defina capa</span>
                        </div>
                        <div className='preview-image'>
                          <img
                            src={srcPreviewSkills.find(skill => {
                              if (skill.index === i) {
                                return skill;
                              }
                            })?.path ?? "#"}
                            style={{display: srcPreviewSkills.find(skill => {
                              if (skill.index === i) {
                                return skill;
                              }
                            })?.path ? "block" : "none"}}
                            id={`preview-skill-${i}`}
                            alt="Preview da imagem selecionada"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteSkill(i, i)}
                          className={styles["delete-attachment"]}
                        >
                          <img
                            src="/icons/x.svg"
                            alt="Excluir habilidade"
                            className={isHighContrast ? "img-contrast-white": ""}
                          />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button type="button" onClick={addSkill} className={`${styles["button-add-input"]} modal-button`}>
                <img
                  src="./icons/plus.svg"
                  alt="Adicionar habilidade"
  
                  className={isHighContrast ? "img-contrast-white": ""}
                />
                <span
                  className="ml-2"
                  style={!isHighContrast ? {color: 'var(--gray-light)'} : {color: 'var(--white)'}}
                >Nova habilidade</span>
              </button>
            </>
          )}

          <hr className="my-4" />

          <h4>Definir níveis da turma</h4>

          <div id="form-levels">
            {levelInputs.map((input, i) => {
              return (
                <div className="form-row" key={`input-level-${i}`}>
                  <input 
                    type="hidden" 
                    name={`levels[${i}][id]`} 
                    defaultValue={input.id} 
                    {...register(`levels.${i}.id`)}
                  />

                  <div className="form-group col-lg-4">
                    <input
                      type="text"
                      className="form-control form-input"
                      name={`levels[${i}][name]`}
                      placeholder="Nome do nível"
                      {...register(`levels.${i}.name`)}
                      defaultValue={input.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-lg-4">
                    <input
                      type="number"
                      min={1}
                      className="form-control form-input"
                      name={`levels[${i}][xp]`}
                      placeholder="XP do nível"
                      {...register(`levels.${i}.xp`)}
                      defaultValue={input.xp}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='form-group col-lg-4 small-preview' id={`preview-level-${i}`} onChange={uploadFile}>
                    <div className="input-file">
                      <input
                        type="file"
                        name={`levels[${i}][file]`}
                        id={`levels[${i}][file]`}
                        accept=".png, .jpg, .jpeg, .svg"
                        {...register(`levels.${i}.file`)}
                        onChange={handleChange}
                      />
                      <label htmlFor={`levels[${i}][file]`}>
                        <img
                          src="./icons/camera.svg"
                          alt="Adicionar imagem"
                          className={isHighContrast ? "img-contrast-white" : ""}
                        />
                      </label>
                      <span>Defina capa</span>
                    </div>
                    <div className='preview-image'>
                      <img
                        src={srcPreviewLevels.find(level => {
                          if (level.index === i) {
                            return level;
                          }
                        })?.path ?? "#"}
                        style={{display: srcPreviewLevels.find(level => {
                          if (level.index === i) {
                            return level;
                          }
                        })?.path ? "block" : "none"}}
                        id={`preview-level-${i}`}
                        alt="Preview da imagem selecionada"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteLevel(i, i)}
                      className={styles["delete-attachment"]}
                    >
                      <img
                        src="/icons/x.svg"
                        alt="Excluir nível"
                        className={isHighContrast ? "img-contrast-white": ""}
                      />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <button type="button" onClick={addLevel} className={`${styles["button-add-input"]} modal-button`}>
            <img
              src="./icons/plus.svg"
              alt="Adicionar nível"
              className={isHighContrast ? "img-contrast-white": ""}
            />
            <span
              className="ml-2"
              style={!isHighContrast ? {color: 'var(--gray-light)'} : {color: 'var(--white)'}}
            >Novo nível</span>
          </button>

          <hr className="mt-3 mb-4" />

          <h4>Adicionar professor(a) parceiro(a)</h4>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-input w-100"
              name="partners[0]"
              placeholder="Email do(a) professor(a)"
              {...register('partners.0')}
            />
          </div>

          <hr className="my-4" />

          <p
            className="text-center"
            style={!isHighContrast ? {color: "var(--red)"} : {color: "var(--yellow-contrast)"}}
          >
            Ao criar a turma, envie o link de acesso gerado automaticamente para os alunos. O link pode ser localizado no lado direito superior do cabeçalho da turma.
          </p>
        </form>
      </Modal.Body>
      <Modal.Footer className={props.type === "create" ? 'd-flex justify-content-between p-4 border-top-0' : 'd-flex p-4 border-top-0'}>
        {props.type === "create" && (
          <button
            className="modal-button"
            style={!isHighContrast ? {color: "var(--gray-title)"} : {}}
            form="create-class"
            type="submit"
            name="save-draft"
            onClick={() => setIsDraft(1)}
          >
            Salvar para depois
          </button>
        )}
        <div>
          <button className="mr-4 modal-button" onClick={closeModal}>Cancelar</button>
          <button
            className="modal-button"
            form="create-class"
            type='submit'
            name="save-class"
            onClick={() => setIsDraft(0)}
          >
            {props.type === "create" ? "Criar" : "Editar"}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}