if (typeof DonateUtils === "undefined") {
    DonateUtils = {}
}
DonateUtils = {
    tip: function (a) {
        $.jBox.tip(a,"success")
    },
    loading: function (a) {
        $.jBox.tip("loading...","loading");
    },
    close: function (a) {
        $.jBox.closeTip();
    },

};