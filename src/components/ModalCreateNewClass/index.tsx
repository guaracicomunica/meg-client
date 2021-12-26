import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

import styles from './styles.module.css';

type ModalCreateNewClassType = {
  show: boolean;
  onHide: () => void;
}

export default function ModalCreateNewClass(props: ModalCreateNewClassType) {
  const [isSkillStoreEnabled, setIsSkillStoreEnabled] = useState(false);

  function enableSkillStore(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.currentTarget.value === "yes") {
      setIsSkillStoreEnabled(true);
    }
    if (e.currentTarget.value === "no") {
      setIsSkillStoreEnabled(false);
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

  function closeModal() {
    props.onHide();
    setIsSkillStoreEnabled(false);
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
        <form>
          <h4>Informações da turma</h4>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-input w-100"
              id="name"
              placeholder="Nome da turma"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-input w-100"
              id="nickname"
              placeholder="Nome da sala"
            />
          </div>
          <div className="input-file" onChange={changeFileSpanText}>
            <input
              type="file"
              id="class-banner"
              accept=".png, .jpg, .jpeg, .svg"
            />
            <label htmlFor="class-banner">
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
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <input
                      type="text"
                      className="form-control form-input"
                      id="name-skill-1"
                      placeholder="Nome da habilidade"
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <input
                      type="number"
                      min={1}
                      className="form-control form-input"
                      id="value-skill-1"
                      placeholder="Valor da habilidade"
                    />
                  </div>

                  <div className="form-group input-file col-md-4" onChange={changeFileSpanText}>
                    <input
                      type="file"
                      id="img-skill-1"
                      accept=".png, .jpg, .jpeg, .svg"
                    />
                    <label htmlFor="img-skill-1" className='ml-1'>
                      <img src="./icons/camera.svg" alt="Adicionar imagem" />
                    </label>
                    <span>Defina uma capa</span>
                  </div>
                </div>
              </div>

              <button className={`${styles["button-add-input"]} modal-button`}>
                <img src="./icons/plus.svg" alt="Adicionar habilidade" style={{height: "1.2rem"}} />
                <span className="ml-2">Nova habilidade</span>
              </button>
            </>
          )}

          <hr className="mt-3 mb-4" />

          <h4>Definir níveis da turma</h4>

          <div id="form-levels">
            <div className="form-row">
              <div className="form-group col-md-4">
                <input
                  type="text"
                  className="form-control form-input"
                  id="name-level-1"
                  placeholder="Nome do nível"
                />
              </div>

              <div className="form-group col-md-4">
                <input
                  type="number"
                  min={1}
                  className="form-control form-input"
                  id="value-level-1"
                  placeholder="XP do nível"
                />
              </div>

              <div className="form-group input-file col-md-4" onChange={changeFileSpanText}>
                <input
                  type="file"
                  id="img-level-1"
                  accept=".png, .jpg, .jpeg, .svg"
                />
                <label htmlFor="img-level-1" className='ml-1'>
                  <img src="./icons/camera.svg" alt="Adicionar imagem" />
                </label>
                <span>Defina uma capa</span>
              </div>
            </div>
          </div>

          <button className={`${styles["button-add-input"]} modal-button`}>
            <img src="./icons/plus.svg" alt="Adicionar nível" style={{height: "1.2rem"}} />
            <span className="ml-2">Novo nível</span>
          </button>

          <hr className="mt-3 mb-4" />

          <h4>Adicionar professor(a) parceiro(a)</h4>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-input w-100"
              id="email-partner"
              placeholder="Email do(a) professor(a)"
            />
          </div>

          <hr className="my-4" />

          <p className="text-center" style={{color: "var(--red)"}}>
            Ao criar a turma, envie o link de acesso gerado automaticamente para os alunos. O link pode ser localizado no lado direito superior do cabeçalho da turma.
          </p>
        </form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between p-4 border-top-0'>
        <button className="modal-button" style={{color: "var(--gray-light)"}}>Salvar para depois</button>
        <div>
          <button className="mr-4 modal-button" onClick={closeModal}>Cancelar</button>
          <button className="modal-button">Criar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}