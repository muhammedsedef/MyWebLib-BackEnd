const commonPassword = [123456,"password","12345678","1234","pussy","12345","dragon","qwerty","696969","mustang","letmein","baseball","master","michael","football","shadow","monkey","abc123","pass","6969","jordan","harley","ranger","iwantu","jennifer","hunter","2000","test","batman","trustno1","thomas","tigger","robert","access","love","buster","1234567","soccer","hockey","killer","george","sexy","andrew","charlie","superman","asshole","dallas","jessica","panties","pepper","1111","austin","william","daniel","golfer","summer","heather","hammer","yankees","joshua","maggie","biteme","enter","ashley","thunder","cowboy","silver","richard","orange","merlin","michelle","corvette","bigdog","cheese","matthew","121212","patrick","martin","freedom","ginger","blowjob","nicole","sparky","yellow","camaro","secret","dick","falcon","taylor","111111","131313","123123","bitch","hello","scooter","please","","porsche","guitar","chelsea","black","diamond","nascar","jackson","cameron","654321","computer","amanda","wizard","xxxxxxxx","money","phoenix","mickey","bailey","knight","iceman","tigers","purple","andrea","horny","dakota","aaaaaa","player","sunshine","morgan","starwars","boomer","cowboys","edward","charles","girls","booboo","coffee","xxxxxx","bulldog","ncc1701","rabbit","peanut","john","johnny","gandalf","spanky","winter","brandy","compaq","carlos","tennis","james","mike","brandon","fender","anthony","blowme","ferrari","cookie","chicken","maverick","chicago","joseph","diablo","sexsex","hardcore","666666","willie","welcome","chris","panther","yamaha","justin","banana","driver","marine","angels","fishing","david","maddog","hooters","wilson","butthead","dennis","captain","bigdick","chester","smokey","xavier","steven","viking","snoopy","blue","eagles","winner","samantha","house","miller","flower","jack","firebird","butter","united","turtle","steelers","tiffany","zxcvbn","tomcat","golf","bond007","bear","tiger","doctor","gateway","gators","angel","junior","thx1138","porno","badboy","debbie","spider","melissa","booger","1212","flyers","fish","porn","matrix","teens","scooby","jason","walter","cumshot","boston","braves","yankee","lover","barney","victor","tucker","princess","mercedes","5150","doggie","zzzzzz","gunner","horney","bubba","2112","fred","johnson","xxxxx","tits","member","boobs","donald","bigdaddy","bronco","penis","voyager","rangers","birdie","trouble","white","topgun","bigtits","bitches","green","super","qazwsx","magic","lakers","rachel","slayer","scott","2222","asdf","video","london","7777","marlboro","srinivas","internet","action","carter","jasper","monster","teresa","jeremy","11111111","bill","crystal","peter","pussies","cock","beer","rocket","theman","oliver","prince","beach","amateur","7777777","muffin","redsox","star","testing","shannon","murphy","frank","hannah","dave","eagle1","11111","mother","nathan","raiders","steve","forever","angela","viper","ou812","jake","lovers","suckit","gregory","buddy","whatever","young","nicholas","lucky","helpme","jackie","monica","midnight","college","baby","brian","mark","startrek","sierra","leather","232323","4444","beavis","bigcock","happy","sophie","ladies","naughty","giants","booty","blonde","golden","0","fire","sandra","pookie","packers","einstein","dolphins","0","chevy","winston","warrior","sammy","slut","8675309","zxcvbnm","nipples","power","victoria","asdfgh","vagina","toyota","travis","hotdog","paris","rock","xxxx","extreme","redskins","erotic","dirty","ford","freddy","arsenal","access14","wolf","nipple","iloveyou","alex","florida","eric","legend","movie","success","rosebud","jaguar","great","cool","cooper","1313","scorpio","mountain","madison","987654","brazil","lauren","japan","naked","squirt","stars","apple","alexis","aaaa","bonnie","peaches","jasmine","kevin","matt","qwertyui","danielle","beaver","4321","4128","runner","swimming","dolphin","gordon","casper","stupid","shit","saturn","gemini","apples","august","3333","canada","blazer","cumming","hunting","kitty","rainbow","112233","arthur","cream","calvin","shaved","surfer","samson","kelly","paul","mine","king","racing","5555","eagle","hentai","newyork","little","redwings","smith","sticky","cocacola","animal","broncos","private","skippy","marvin","blondes","enjoy","girl","apollo","parker","qwert","time","sydney","women","voodoo","magnum","juice","abgrtyu","777777","dreams","maxwell","music","rush2112","russia","scorpion","rebecca","tester","mistress","phantom","billy","6666","albert"];

const {check,validationResult } = require('express-validator/check');

//CREATING NEW USER
const userValidationRules = () => {
    return [
        check('email', 'Your email is not valid').isEmail(),

        check('password', 'The password must be 6+ chars long and contain a number')
        .isStrongPassword().withMessage('Please enter a strong password!')
        .not().isIn(commonPassword).withMessage('Do not use a common word as the password')
        .isLength({ min: 6 }).withMessage('The password must be 6+ chars')
        .matches(/\d/).withMessage('Your password has to include a number at least'),
    ]
}

//RESET PASSWORD
const resetPasswordValidationRules = () => {
  return [
      check('newPassword', 'The password must be 6+ chars long and contain a number')
      .isStrongPassword().withMessage('Please enter a strong password!')
      .not().isIn(commonPassword).withMessage('Do not use a common word as the password')
      .isLength({ min: 6 }).withMessage('The password must be 6+ chars')
      .matches(/\d/).withMessage('Your password has to include a number at least'),
  ]
}

//CHECK IS THERE ANY ERROR OR NOT FOR VALIDATION
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    /*
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    */
    return res.status(400).json({
      status: 400,
      errors: errors.array(),
    })
}

module.exports = {
    userValidationRules,
    validate,
    resetPasswordValidationRules,
}  
