const groupServices = require("../services/Group.service");

// Create Group
const createGroup = async (req, res) => {
  try {
    const { title, description, owner, members } = req.body;

    const groupData = {
      title,
      description,
      owner,
      members,
    };
    // Validate required fields
    if (!title || !description || !owner || !members) {
      return res.status(400).json({
        status: false,
        message: "Please provide all required fields",
        data: false,
      });
    }
    // Validate user exists
    const groupExists = await groupServices.checkGroupExists(title);
    if (groupExists) {
      return res
        .status(400)
        .json({ status: false, message: "Group Already Exists With This Name", data: false });
    }

    const response = await groupServices.createGroup(groupData);
    return res.status(response.status === true ? 201 : 400).json(response);
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: false,
    });
  }
};

// addGroupMember
const addGroupMember = async (req, res) => {
  try {
    const { group, member } = req.body;
    // Validate required fields
    if (!group || !member) {
      return res.status(400).json({
        status: false,
        message: "Please provide all required fields",
        data: false,
      });
    }
    // Validate user exists
    const groupExists = await groupServices.checkGroupExists(group, 1);
    if (!groupExists) {
      return res
        .status(400)
        .json({ status: false, message: "Group not found", data: false });
    }
    const response = await groupServices.addGroupMember(group, member);
    return res.status(response.status === true ? 201 : 400).json(response);
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: false,
    });
  }
};


module.exports = {
  createGroup,
  addGroupMember,
};
