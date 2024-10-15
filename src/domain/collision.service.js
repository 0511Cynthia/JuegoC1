class CollisionService{
    detectCollision(player1, player2){
        return player1.x < player2.x + 50 && player1.x + 50 > player2.x &&
            player1.y < player2.y + 50 && player1.y + 50 > player2.y;
        }
}
export default CollisionService;