const Group = require("../models/Group.model");

// 1. **Create Group**
const createGroup = async (groupData) => {
  try {
    const group = new Group(groupData);
    await group.save();
    return { status: true, message: "Group created successfully", data: group };
  } catch (error) {
    return { status: false, message: error.message, data: false };
  }
};

// 2. **Check Group Exists**
const checkGroupExists = async (data, flag = undefined) => {
  try {
    if (flag == 1) {
      const group = await Group.findById({ _id: data, deleteFlag: false });
      return group ? true : false;
    } else {
      const group = await Group.findOne({ title: data, deleteFlag: false });
      return group ? true : false;
    }
  } catch (error) {
    return false;
  }
};

// 3. **Add Group Member**
const addGroupMember = async (group, member) => {
  try {
    const groupData = await Group.findByIdAndUpdate(
      { _id: group },
      { $push: { members: member } },
      { new: true }
    );
    return {
      status: true,
      message: "Member added successfully",
      data: groupData,
    };
  } catch (error) {
    return { status: false, message: error.message, data: false };
  }
};

module.exports = {
  createGroup,
  checkGroupExists,
  addGroupMember,
};
