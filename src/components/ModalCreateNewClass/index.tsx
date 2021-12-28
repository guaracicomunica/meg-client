import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { api } from '../../services/api';
import { options } from '../../utils/defaultToastOptions';

import styles from './styles.module.css';

type ModalCreateNewClassType = {
  show: boolean;
  onHide: () => void;
}

type SkillType = {
  name: string;
  coins: number;
}

type LevelType = {
  name: string;
  xp: number;
}

type DataClassType = {
  name: string;
  nickname: string;
  partners?: string[];
  skills?: SkillType[];
  levels: LevelType[];
  file?: File;
}

export default function ModalCreateNewClass(props: ModalCreateNewClassType) {
  const { register, unregister, handleSubmit, reset } = useForm({defaultValues: {
    name: "",
    nickname: "",
    partners: [],
    skills: [],
    levels: [],
    file: null,
  }});

  const onSubmit = async (data: DataClassType) => handleCreateClass(data);

  const [isSkillStoreEnabled, setIsSkillStoreEnabled] = useState(false);
  const [skillsCounter, setSkillsCounter] = useState(1);
  const [skillInputs, setSkillInputs] = useState([]);
  const [levelsCounter, setLevelsCounter] = useState(1);
  const [levelInputs, setLevelInputs] = useState([]);
  const [isDraft, setIsDraft] = useState(1);

  useEffect(() => {
    if (props.show) {
      setLevelInputs([
        <div className="form-row" key="input-level-1">
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control form-input"
              name="levels[0][name]"
              placeholder="Nome do nível"
              {...register('levels.0.name')}
            />
          </div>

          <div className="form-group col-md-4">
            <input
              type="number"
              min={1}
              className="form-control form-input"
              name="levels[0][xp]"
              placeholder="XP do nível"
              {...register('levels.0.xp')}
            />
          </div>

          <div className="form-group input-file col-md-4" onChange={changeFileSpanText}>
            <input
              type="file"
              name="img-level-1"
              accept=".png, .jpg, .jpeg, .svg"
            />
            <label htmlFor="img-level-1" className='ml-1'>
              <img src="./icons/camera.svg" alt="Adicionar imagem" />
            </label>
            <span>Defina uma capa</span>
          </div>
        </div>
      ]);
    }
  }, [props.show]);

  useEffect(() => {
    if (!isSkillStoreEnabled) {
      setSkillInputs([
        <div className="form-row" key="input-skill-1">
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control form-input"
              name="skills[0][name]"
              placeholder="Nome da habilidade"
              {...register('skills.0.name')}
            />
          </div>

          <div className="form-group col-md-4">
            <input
              type="number"
              min={1}
              className="form-control form-input"
              name="skills[0][coins]"
              placeholder="Valor da habilidade"
              {...register('skills.0.coins')}
            />
          </div>

          <div className="form-group input-file col-md-4" onChange={changeFileSpanText}>
            <input
              type="file"
              name="img-skill-1"
              accept=".png, .jpg, .jpeg, .svg"
            />
            <label htmlFor="img-skill-1" className='ml-1'>
              <img src="./icons/camera.svg" alt="Adicionar imagem" />
            </label>
            <span>Defina uma capa</span>
          </div>
        </div>
      ]);
    }
  }, [isSkillStoreEnabled]);

  function enableSkillStore(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.currentTarget.value === "yes") {
      setIsSkillStoreEnabled(true);
    }
    if (e.currentTarget.value === "no") {
      setIsSkillStoreEnabled(false);
      unregister('skills.0.name');
      unregister('skills.0.coins');
      setSkillsCounter(1);
    }
  }

  function changeFileSpanText(e: React.ChangeEvent<HTMLDivElement>) {
    if (e.currentTarget.querySelector("input").files.length > 0) {
      e.currentTarget.querySelector("span").innerText = "Alterar capa selecionada";
    }
    else {
      e.currentTarget.querySelector("span").innerText = "Defina uma capa";
    }
  }

  function addSkill(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const input = (
      <div className="form-row" key={`input-skill-${skillsCounter+1}`}>
        <div className="form-group col-md-4">
          <input
            type="text"
            className="form-control form-input"
            name={`skills[${skillsCounter}][name]`}
            placeholder="Nome da habilidade"
            {...register(`skills.${skillsCounter}.name`)}
          />
        </div>

        <div className="form-group col-md-4">
          <input
            type="number"
            min={1}
            className="form-control form-input"
            name={`skills[${skillsCounter}][coins]`}
            placeholder="Valor da habilidade"
            {...register(`skills.${skillsCounter}.coins`)}
          />
        </div>

        <div className="form-group input-file col-md-4" onChange={changeFileSpanText}>
          <input
            type="file"
            name={`img-skill-${skillsCounter+1}`}
            accept=".png, .jpg, .jpeg, .svg"
          />
          <label htmlFor={`img-skill-${skillsCounter+1}`} className='ml-1'>
            <img src="./icons/camera.svg" alt="Adicionar imagem" />
          </label>
          <span>Defina uma capa</span>
        </div>
      </div>
    );

    setSkillsCounter(skillsCounter+1);
    setSkillInputs([
      ...skillInputs,
      input
    ]);
  }

  function addLevel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    
    const input = (
      <div className="form-row" key={`input-level-${levelsCounter+1}`}>
        <div className="form-group col-md-4">
          <input
            type="text"
            className="form-control form-input"
            name={`levels[${levelsCounter}][name]`}
            placeholder="Nome do nível"
            {...register(`levels.${levelsCounter}.name`)}
          />
        </div>

        <div className="form-group col-md-4">
          <input
            type="number"
            min={1}
            className="form-control form-input"
            name={`levels[${levelsCounter}][xp]`}
            placeholder="XP do nível"
            {...register(`levels.${levelsCounter}.xp`)}
          />
        </div>

        <div className="form-group input-file col-md-4" onChange={changeFileSpanText}>
          <input
            type="file"
            name={`img-level-${levelsCounter+1}`}
            accept=".png, .jpg, .jpeg, .svg"
          />
          <label htmlFor={`img-level-${levelsCounter+1}`} className='ml-1'>
            <img src="./icons/camera.svg" alt="Adicionar imagem" />
          </label>
          <span>Defina uma capa</span>
        </div>
      </div>
    );

    setLevelsCounter(levelsCounter+1);
    setLevelInputs([
      ...levelInputs,
      input
    ]);
  }

  function closeModal() {
    props.onHide();
    setIsSkillStoreEnabled(false);
    setLevelsCounter(1);
    setSkillsCounter(1);
    reset({
      name: "",
      nickname: "",
      partners: [],
      skills: [],
      levels: [],
      file: null,
    });
  }

  function generateFormData(data: DataClassType) {
    const form = new FormData();
    form.append('id', '0');
    form.append('name', data.name);
    form.append('nickname', data.nickname);
    form.append('is_draft', isDraft.toString());

    for (let i = 0; i < data.levels.length; i++) {
      form.append(`levels[${i}][name]`, data.levels[i].name);
      form.append(`levels[${i}][xp]`, data.levels[i].xp.toString());
    }

    if (data.skills[0].name != undefined && data.skills[0].coins) {
      for (let i = 0; i < data.skills.length; i++) {
        form.append(`skills[${i}][name]`, data.skills[i].name);
        form.append(`skills[${i}][coins]`, data.skills[i].coins.toString());
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

  async function handleCreateClass(data: DataClassType) {
    try {
      const request = generateFormData(data);

      await api.post('classes', request, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(function (success) {
        toast.success("Turma criada com sucesso!", options);
        setIsSkillStoreEnabled(false);
        reset({
          name: "",
          nickname: "",
          partners: [],
          skills: [],
          levels: [],
          file: null
        });
        setSkillsCounter(1);
        setLevelsCounter(1);
        props.onHide();
      });
    }
    catch(error) {
      console.log(error)
      const string = "Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.";

      if (!error.response) {
        // network error
        return toast.error(string, options);
      }
      switch (error.response.status) {
        case 400:
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : string, options);

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });

        case 500: 
          toast.error(string, options);
          break;

        default:
          toast.error(string, options);
          break;
      }
    }
  }

  return (
    <Modal
      id="modal-add-class-teacher"
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="modal-title"
      centered
      className="modal-style"
      backdrop="static"
    >
      <Modal.Header className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          Criar nova turma
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <form
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
          <div className="input-file" onChange={changeFileSpanText}>
            <input
              type="file"
              id="file"
              name="file"
              accept=".png, .jpg, .jpeg, .svg"
              {...register('file')}
            />
            <label htmlFor="file">
              <img src="./icons/camera.svg" alt="Adicionar imagem" />
            </label>
            <span>Defina uma capa</span>
          </div>

          <hr className="my-4" />

          <div>
            <strong style={{color: "var(--gray-title)"}}>Deseja criar uma loja de Habilidades para essa turma?</strong>
            <select
              onChange={enableSkillStore}
              defaultValue={-1}
              className="ml-md-4 p-2 select"
              name="skill-store"
              id="skill-store"
            >
              <option disabled={true} value={-1}>Escolha uma opção:</option>
              <option value="yes">Quero uma loja</option>
              <option value="no">Não quero uma loja</option>
            </select>
          </div>

          {isSkillStoreEnabled && (
            <>
              <hr className="my-4" />

              <h4>Loja de habilidades</h4>

              <div id="form-skills">
                {skillInputs.map(input => input)}
              </div>

              <button onClick={addSkill} className={`${styles["button-add-input"]} modal-button`}>
                <img src="./icons/plus.svg" alt="Adicionar habilidade" style={{height: "1.2rem"}} />
                <span className="ml-2">Nova habilidade</span>
              </button>
            </>
          )}

          <hr className="mt-3 mb-4" />

          <h4>Definir níveis da turma</h4>

          <div id="form-levels">
            {levelInputs.map(input => input)}
          </div>

          <button onClick={addLevel} className={`${styles["button-add-input"]} modal-button`}>
            <img src="./icons/plus.svg" alt="Adicionar nível" style={{height: "1.2rem"}} />
            <span className="ml-2">Novo nível</span>
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

          <p className="text-center" style={{color: "var(--red)"}}>
            Ao criar a turma, envie o link de acesso gerado automaticamente para os alunos. O link pode ser localizado no lado direito superior do cabeçalho da turma.
          </p>
        </form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between p-4 border-top-0'>
        <button
          className="modal-button"
          style={{color: "var(--gray-light)"}}
          form="create-class"
          type="submit"
          name="save-draft"
          onClick={() => setIsDraft(1)}
        >
          Salvar para depois
        </button>
        <div>
          <button className="mr-4 modal-button" onClick={closeModal}>Cancelar</button>
          <button
            className="modal-button"
            form="create-class"
            type='submit'
            name="save-class"
            onClick={() => setIsDraft(0)}
          >
            Criar
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}