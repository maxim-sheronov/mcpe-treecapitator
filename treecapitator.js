/* tested on MCPE 0.14.2 */

const ID_WOODEN_AXE = 271;
const ID_STONE_AXE = 275;
const ID_IRON_AXE = 258;
const ID_DIAMOND_AXE = 279;
const ID_GOLD_AXE = 286;

const ID_WOOD = 17;
const ID_ACACIA_WOOD = 162;

function newLevel() {
  clientMessage("Treecapitator for 0.14.2 - big trees supported!");
}

function isAxe(itemId) {
  return (itemId == ID_WOODEN_AXE || itemId == ID_STONE_AXE || itemId == ID_IRON_AXE || itemId == ID_DIAMOND_AXE || itemId == ID_GOLD_AXE);
}

function isWood(blockId) {
  return (blockId == ID_WOOD || blockId == ID_ACACIA_WOOD);
}

function findWoodForRemove(x, y, z, woodType) {

  tryRemoveWoodAndFind(x + 1, y, z, woodType);
  tryRemoveWoodAndFind(x - 1, y, z, woodType);
  tryRemoveWoodAndFind(x, y, z + 1, woodType);
  tryRemoveWoodAndFind(x, y, z - 1, woodType);

  tryRemoveWoodAndFind(x + 1, y, z + 1, woodType);
  tryRemoveWoodAndFind(x + 1, y, z - 1, woodType);
  tryRemoveWoodAndFind(x - 1, y, z + 1, woodType);
  tryRemoveWoodAndFind(x - 1, y, z - 1, woodType);

  tryRemoveWoodAndFind(x, y + 1, z, woodType);

  tryRemoveWoodAndFind(x + 1, y + 1, z, woodType);
  tryRemoveWoodAndFind(x - 1, y + 1, z, woodType);
  tryRemoveWoodAndFind(x, y + 1, z + 1, woodType);
  tryRemoveWoodAndFind(x, y + 1, z - 1, woodType);

  tryRemoveWoodAndFind(x + 1, y + 1, z + 1, woodType);
  tryRemoveWoodAndFind(x + 1, y + 1, z - 1, woodType);
  tryRemoveWoodAndFind(x - 1, y + 1, z + 1, woodType);
  tryRemoveWoodAndFind(x - 1, y + 1, z - 1, woodType);
}

function tryRemoveWoodAndFind(x, y, z, woodType) {
  var tileId = getTile(x, y, z);
  if (isWood(tileId) && (Level.getData(x, y, z) & 0b00000011) == woodType) {
    Level.setTile(x, y, z, 0);
    Level.dropItem(x, y, z, 0, ID_WOOD, 1, woodType);
    Entity.setCarriedItem(getPlayerEnt(), Player.getCarriedItem(), Player.getCarriedItemCount(), Player.getCarriedItemData() + 1);

    findWoodForRemove(x, y, z, woodType);
  }
}

function destroyBlock(x, y, z, side) {
  if (isAxe(Player.getCarriedItem())) {

    var woodType = Level.getData(x, y, z) & 0b00000011;

    if (isWood(getTile(x, y, z))) {
      findWoodForRemove(x, y, z, woodType);
    }
  }
}
