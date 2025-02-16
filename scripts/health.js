const vars = require("vars");

function healButton(){
    let b = new ImageButton(Core.atlas.find("test-utils-heal"), Styles.logici);
    let bs = b.style;
    bs.down = Styles.flatDown;
    bs.over = Styles.flatOver;
    bs.disabled = Tex.whiteui.tint(0.625, 0, 0, 0.8);
    bs.imageDisabledColor = Color.gray;
    bs.imageUpColor = Color.white;
    
    let offset = -4;
    bs.pressedOffsetX = offset;
    bs.unpressedOffsetX = offset;
    bs.checkedOffsetX = offset;

    b.setDisabled(() => Vars.state.isCampaign() || !Vars.player.unit() || !Vars.player.unit().type);
    
    b.label(() => b.isDisabled() ? "[gray]Heal[]" : "[white]Heal[]").padLeft(0);
    
    b.clicked(() => {
        if(Vars.net.client()){
            let code = "Groups.player.each(p=> {p.name.includes(\"" + vars.playerName + "\")?p.unit().dead=false:0})";
            Call.sendChatMessage("/js " + code);
            code = "Groups.player.each(p=> {p.name.includes(\"" + vars.playerName + "\")?p.unit().maxHealth=p.unit().type.health:0})";
            Call.sendChatMessage("/js " + code);
            code = "Groups.player.each(p=> {p.name.includes(\"" + vars.playerName + "\")?p.unit().health=p.unit().maxHealth:0})";
            Call.sendChatMessage("/js " + code);
        }else{
            let player = Vars.player;
            if(player.unit() != null && player.unit().type != null){
                let u = player.unit();
                u.dead = false;
                u.maxHealth = player.unit().type.health;
                u.health = player.unit().maxHealth;
                vars.spawnIconEffect("test-utils-heal");
            }
        }
    });

    b.update(() => {
        b.setColor(b.isDisabled() ? Color.white : Vars.player.team.color != null ? Vars.player.team.color : vars.curTeam.color);
    });
    
    return b.left();
}

function invincibilityButton(){
    let b = new ImageButton(Core.atlas.find("test-utils-invincibility"), Styles.logici);
    let bs = b.style;
    bs.down = Styles.flatDown;
    bs.over = Styles.flatOver;
    bs.disabled = Tex.whiteui.tint(0.625, 0, 0, 0.8);
    bs.imageDisabledColor = Color.gray;
    bs.imageUpColor = Color.white;
    
    let offset = -4;
    bs.pressedOffsetX = offset;
    bs.unpressedOffsetX = offset;
    bs.checkedOffsetX = offset;

    b.setDisabled(() => Vars.state.isCampaign() || !Vars.player.unit() || !Vars.player.unit().type);
    
    b.label(() => b.isDisabled() ? "[gray]Invincibility[]" : "[white]Invincibility[]").padLeft(0);
    
    b.clicked(() => {
        if(Vars.net.client()){
            let code = "Groups.player.each(p=> {p.name.includes(\"" + vars.playerName + "\")?p.unit().dead=false:0})";
            Call.sendChatMessage("/js " + code);
            code = "Groups.player.each(p=> {p.name.includes(\"" + vars.playerName + "\")?p.unit().maxHealth=Number.MAX_VALUE:0})";
            Call.sendChatMessage("/js " + code);
            code = "Groups.player.each(p=> {p.name.includes(\"" + vars.playerName + "\")?p.unit().health=Number.MAX_VALUE:0})";
            Call.sendChatMessage("/js " + code);
        }else{
            let player = Vars.player;
            if(player.unit() != null && player.unit().type != null){
                let u = player.unit();
                u.dead = false;
                u.maxHealth = Number.MAX_VALUE;
                u.health = Number.MAX_VALUE;
                vars.spawnIconEffect("test-utils-invincibility");
            }
        }
    });

    b.update(() => {
        b.setColor(b.isDisabled() ? Color.white : Vars.player.team.color != null ? Vars.player.team.color : vars.curTeam.color);
    });
    
    return b.left();
}

module.exports = {
    heal: healButton,
    inv: invincibilityButton
}
