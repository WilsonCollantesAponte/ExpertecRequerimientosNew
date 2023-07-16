const express = require("express");
const { User, Requirement, UserXRequirement } = require("../db");
const { Op } = require("sequelize");
const router = express.Router();

router.post("/newUser", async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      email,
      telefono,
      empresa,
      password,
      administrador,
      desarrollador,
      cliente,
    } = req.body;

    const newUser = await User.create({
      nombres,
      apellidos,
      email,
      telefono,
      empresa,
      password,
      administrador,
      desarrollador,
      cliente,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/findUser", async (req, res) => {
  const { email } = req.query;
  try {
    const userFind = await User.findOne({
      where: { email },
    });

    if (!userFind) {
      res.status(200).json({ status: false });
    } else res.status(200).json({ status: true, userFind });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/loginUser", async (req, res) => {
  const { email, password } = req.query;
  try {
    const userFind = await User.findOne({
      where: { email, password },
    });

    if (!userFind) {
      res.status(200).json({ status: false });
    } else res.status(200).json({ status: true, userFind });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/user", async (req, res) => {
  try {
    const { id } = req.query;

    const one = await User.findOne({
      where: { id },
      include: Requirement,
    });

    res.status(200).json(one);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/allUsers", async (req, res) => {
  try {
    const allMembers = await User.findAll();
    res.status(200).json(allMembers);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/user", async (req, res) => {
  try {
    const { id, email } = req.query;

    const willBeDeleted = await User.findByPk(id);

    await Requirement.destroy({
      where: {
        [Op.or]: [{ emailCliente: email }, { emailDesarrollador: email }],
      },
    });

    await User.destroy({
      where: { id },
    });

    res.status(200).json({ id, email, message: "Deleted OK", willBeDeleted });
  } catch (error) {
    res.status(400).send(error.message);
  }
}); // con id e Email

router.post("/requirement", async (req, res) => {
  try {
    const {
      title,
      descripcion,
      tipoRequerimiento,
      plataforma,
      vista,
      interaccion,
      prioridad,
      emailCliente,
      emailDesarrollador,
      fechaInicio,
      fechaFin,
      tiempoEstimado,
    } = req.body;

    const newRequirement = await Requirement.create({
      title,
      descripcion,
      tipoRequerimiento,
      plataforma,
      vista,
      interaccion,
      prioridad,
      emailCliente,
      emailDesarrollador,
      fechaInicio,
      fechaFin,
      tiempoEstimado,
    });

    res.status(200).json(newRequirement);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/requirement", async (req, res) => {
  try {
    const { id } = req.query;
    let one = {};

    if (id) {
      one = await Requirement.findOne({
        where: { id },
        include: User,
        order: [["id", "ASC"]],
      });
    } else {
      one = await Requirement.findAll({ order: [["id", "ASC"]] }); //// Solución al error causado por 'update' por defecto
      // de una ' finder ' -- Nombre técnico de la solución : ' Order by '
    }

    res.status(200).json(one); ////////////////////////////////////////////////Change
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/requirement", async (req, res) => {
  const { id } = req.body;

  const { estadoFinalDev } = await Requirement.findOne({ where: { id } });

  if (estadoFinalDev)
    await Requirement.update({ estadoFinalDev: false }, { where: { id } });
  else await Requirement.update({ estadoFinalDev: true }, { where: { id } });

  const val = await Requirement.findOne({ where: { id } });

  // res.status(200).send("Ya ta'");
  res.status(200).json(val);
});

router.put("/requirementAdmin", async (req, res) => {
  const { id } = req.body;

  const { estadoFinalAdmin } = await Requirement.findOne({ where: { id } });

  if (estadoFinalAdmin)
    await Requirement.update({ estadoFinalAdmin: false }, { where: { id } });
  else await Requirement.update({ estadoFinalAdmin: true }, { where: { id } });

  const val = await Requirement.findOne({ where: { id } });

  // res.status(200).send("Ya ta'");
  res.status(200).json(val);
});

router.get("/allDev", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      const allMembers = await User.findAll({ where: { desarrollador: true } });
      res.status(200).json(allMembers);
    } else {
      const arrName = name.split(" ");
      const devs = await User.findAll({
        where: { desarrollador: true },
      });

      const idToMatch = [];

      devs.forEach((val) => {
        let validator = true;

        for (const iterator of arrName) {
          if (
            !(val.nombres.replace(" ", "") + val.apellidos.replace(" ", ""))
              .toLowerCase()
              .includes(iterator.toLowerCase())
          ) {
            validator = false;
            break;
          }
        }
        if (validator) idToMatch.push(val.id);
      });

      const devsFind = await User.findAll({
        where: { id: idToMatch },
      }); // A comparacion de la '--Referencia 1' esta forma hace lo mismo, pero con diferente sitaxis (mas corto)

      res.status(200).json({ arrName, idToMatch, devsFind });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/allClients", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      const allMembers = await User.findAll({ where: { cliente: true } });
      res.status(200).json(allMembers);
    } else {
      const arrName = name.split(" ");
      const clients = await User.findAll({
        where: { cliente: true },
      });

      const idToMatch = [];

      clients.forEach((val) => {
        let validator = true;

        for (const iterator of arrName) {
          if (
            !(val.nombres.replace(" ", "") + val.apellidos.replace(" ", ""))
              .toLowerCase()
              .includes(iterator.toLowerCase())
          ) {
            validator = false;
            break;
          }
        }
        if (validator) idToMatch.push(val.id);
      });

      const customersFound = await User.findAll({
        where: { id: idToMatch },
      }); // A comparacion de la '--Referencia 1' esta forma hace lo mismo, pero con diferente sitaxis (mas corto)

      res.status(200).json({ arrName, idToMatch, customersFound });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/userRequirement", async (req, res) => {
  try {
    const all = await UserXRequirement.findAll();

    res.status(200).json(all);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/userRequirement", async (req, res) => {
  try {
    const { UserId, RequirementId } = req.body;

    const newPost = await UserXRequirement.create({ UserId, RequirementId });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/requirement", async (req, res) => {
  try {
    const { id } = req.query;

    const willBeDeleted = await Requirement.findByPk(id);

    await Requirement.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ id, message: "Deleted OK", willBeDeleted });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
