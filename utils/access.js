// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = userIsAdmin(auth);
  const isOwner = userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const userOwnsCurrentItem = ({ existingItem, authentication: { item } }) => {
  return item.isAdmin || existingItem.id === item.id;
}

module.exports = {
  userIsAdmin,
  userOwnsItem,
  userIsAdminOrOwner,
  userOwnsCurrentItem
};