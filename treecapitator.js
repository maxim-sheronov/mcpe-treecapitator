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

function findWoodForRemove(x, y, z, blockId, woodType) {

  tryRemoveWoodAndFind(x + 1, y, z, blockId, woodType);
  tryRemoveWoodAndFind(x - 1, y, z, blockId, woodType);
  tryRemoveWoodAndFind(x, y, z + 1, blockId, woodType);
  tryRemoveWoodAndFind(x, y, z - 1, blockId, woodType);

  tryRemoveWoodAndFind(x + 1, y, z + 1, blockId, woodType);
  tryRemoveWoodAndFind(x + 1, y, z - 1, blockId, woodType);
  tryRemoveWoodAndFind(x - 1, y, z + 1, blockId, woodType);
  tryRemoveWoodAndFind(x - 1, y, z - 1, blockId, woodType);

  tryRemoveWoodAndFind(x, y + 1, z, blockId, woodType);

  tryRemoveWoodAndFind(x + 1, y + 1, z, blockId, woodType);
  tryRemoveWoodAndFind(x - 1, y + 1, z, blockId, woodType);
  tryRemoveWoodAndFind(x, y + 1, z + 1, blockId, woodType);
  tryRemoveWoodAndFind(x, y + 1, z - 1, blockId, woodType);

  tryRemoveWoodAndFind(x + 1, y + 1, z + 1, blockId, woodType);
  tryRemoveWoodAndFind(x + 1, y + 1, z - 1, blockId, woodType);
  tryRemoveWoodAndFind(x - 1, y + 1, z + 1, blockId, woodType);
  tryRemoveWoodAndFind(x - 1, y + 1, z - 1, blockId, woodType);
}

function tryRemoveWoodAndFind(x, y, z, blockId, woodType) {
  var tileId = getTile(x, y, z);
  if (blockId == tileId && (Level.getData(x, y, z) & 0b00000011) == woodType) {
    Level.destroyBlock(x, y, z, true);
    
    // Level.setTile(x, y, z, 0);
    // Level.dropItem(x, y, z, 0, blockId, 1, woodType);
    Entity.setCarriedItem(getPlayerEnt(), Player.getCarriedItem(), Player.getCarriedItemCount(), Player.getCarriedItemData() + 1);

    findWoodForRemove(x, y, z, blockId, woodType);
  }
}

function destroyBlock(x, y, z, side) {
  if (isAxe(Player.getCarriedItem())) {

    var woodType = Level.getData(x, y, z) & 0b00000011;
    var blockId = getTile(x, y, z); 

    if (isWood(blockId)) {
      findWoodForRemove(x, y, z, blockId, woodType);
    }
  }
}
