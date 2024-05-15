pm.test("Successful POST REQUEST",function(){
    pm.expect(pm.response.code).to.be.oneOf([200,201]);
})