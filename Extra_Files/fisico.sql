-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema medLar
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema medLar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `medLar` DEFAULT CHARACTER SET utf8 ;
USE `medLar` ;

-- -----------------------------------------------------
-- Table `medLar`.`Utente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medLar`.`Utente` (
  `nr_processo` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `apelido` VARCHAR(45) NOT NULL,
  `genero` VARCHAR(45) NOT NULL,
  `data_nascimento` VARCHAR(45) NOT NULL,
  `contacto` VARCHAR(45) NOT NULL,
  `encarregado` VARCHAR(45) NOT NULL,
  `parentesco` VARCHAR(45) NOT NULL,
  `contacto_enc` VARCHAR(45) NOT NULL,
  `rua` VARCHAR(45) NOT NULL,
  `localidade` VARCHAR(45) NOT NULL,
  `codigo_postal` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`nr_processo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medLar`.`Medicamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medLar`.`Medicamento` (
  `id_med` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `preco` DOUBLE NOT NULL,
  `lab` VARCHAR(90) NOT NULL,
  `uni_emb` INT NOT NULL,
  `formato` VARCHAR(45) NOT NULL,
  `dosagem` VARCHAR(45) NOT NULL,
  `quantidade` INT NOT NULL,
  PRIMARY KEY (`id_med`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medLar`.`Slot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medLar`.`Slot` (
  `med` INT NOT NULL,
  `nr_utente` INT NOT NULL,
  `data_inicio` VARCHAR(45) NOT NULL,
  `data_fim` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`med`, `nr_utente`, `data_inicio`, `data_fim`),
  INDEX `fk_Medicamento_has_Utente_Utente2_idx` (`nr_utente` ASC) VISIBLE,
  INDEX `fk_Medicamento_has_Utente_Medicamento2_idx` (`med` ASC) VISIBLE,
  CONSTRAINT `fk_Medicamento_has_Utente_Medicamento2`
    FOREIGN KEY (`med`)
    REFERENCES `medLar`.`Medicamento` (`id_med`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Medicamento_has_Utente_Utente2`
    FOREIGN KEY (`nr_utente`)
    REFERENCES `medLar`.`Utente` (`nr_processo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medLar`.`Horario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medLar`.`Horario` (
  `idHorario` INT NOT NULL AUTO_INCREMENT,
  `dia` VARCHAR(45) NOT NULL,
  `periodo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idHorario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medLar`.`Auxiliar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medLar`.`Auxiliar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(255) NOT NULL,
  `contacto` VARCHAR(45) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `apelido` VARCHAR(45) NOT NULL,
  `data_nascimento` VARCHAR(45) NOT NULL,
  `rua` VARCHAR(45) NOT NULL,
  `localidade` VARCHAR(45) NOT NULL,
  `codigo_postal` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medLar`.`Gere`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medLar`.`Gere` (
  `nr_auxiliar` INT NOT NULL,
  `med` INT NOT NULL,
  `data` VARCHAR(45) NOT NULL,
  `quantidade` INT NOT NULL,
  PRIMARY KEY (`nr_auxiliar`, `med`),
  INDEX `fk_Auxiliar_has_Medicamento_Medicamento1_idx` (`med` ASC) VISIBLE,
  INDEX `fk_Auxiliar_has_Medicamento_Auxiliar1_idx` (`nr_auxiliar` ASC) VISIBLE,
  CONSTRAINT `fk_Auxiliar_has_Medicamento_Auxiliar1`
    FOREIGN KEY (`nr_auxiliar`)
    REFERENCES `medLar`.`Auxiliar` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Auxiliar_has_Medicamento_Medicamento1`
    FOREIGN KEY (`med`)
    REFERENCES `medLar`.`Medicamento` (`id_med`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medLar`.`Tarefa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medLar`.`Tarefa` (
  `id_Tarefa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `data` VARCHAR(45) NOT NULL,
  `estado` TINYINT NOT NULL,
  `nr_auxiliar` INT NOT NULL,
  PRIMARY KEY (`id_Tarefa`, `nr_auxiliar`),
  INDEX `fk_Tarefa_Auxiliar1_idx` (`nr_auxiliar` ASC) VISIBLE,
  CONSTRAINT `fk_Tarefa_Auxiliar1`
    FOREIGN KEY (`nr_auxiliar`)
    REFERENCES `medLar`.`Auxiliar` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medLar`.`slot_horario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medLar`.`slot_horario` (
  `quantidade` INT NOT NULL,
  `med` INT NOT NULL,
  `nr_utente` INT NOT NULL,
  `idHorario` INT NOT NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`med`, `nr_utente`, `idHorario`),
  INDEX `fk_Caixa_Horario_Horario1_idx` (`idHorario` ASC) VISIBLE,
  CONSTRAINT `fk_Caixa_Horario_Caixa1`
    FOREIGN KEY (`med` , `nr_utente`)
    REFERENCES `medLar`.`Slot` (`med` , `nr_utente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Caixa_Horario_Horario1`
    FOREIGN KEY (`idHorario`)
    REFERENCES `medLar`.`Horario` (`idHorario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
