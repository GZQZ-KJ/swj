import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView
} from 'react-native'
export default class agreement extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <StatusBar backgroundColor="#3D72E4"></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image style={styles.arrow} source={require('../../../assets/icons/backo.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>{'《NSS交易APP》用户协议'}</Text>
                </View>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.tex}>系为用户提供数字资产交易和相关服务的手机端信息服务《NSSapp》（以下简称“《NSSapp》”）。《NSSapp》依据本协议（定义见下文）的规定为在《NSSapp》进行注册的用户（以下简称“用户”）提供服务，本协议在用户和《NSSapp》之间具有法律约束力。《NSSapp》在此特别提醒用户认真阅读并充分理解本协议项下的各条款，特别是本协议中涉及免除或限制《NSSapp》责任的条款，以及排除或限制用户权利的条款。用户应当审慎阅读，并选择接受或不接受本协议。除非用户接受本协议项下的所有条款，否则用户无权使用《NSSapp》基于本协议所提供的服务。若用户不同意本协议的内容，或拒绝承认《NSSapp》随时对本协议进行单方修改的权利，则用户应当立即停止使用并不再访问本《NSSapp》。用户一经注册成为用户或使用《NSSapp》服务即视为对本协议全部条款（包括本公司对本协议随时做出的任何修改）充分理解并完全接受。</Text>
                        <Text style={styles.tex}>为了本协议表述之方便，本《NSSapp》在本协议中合称使用“我们”或其他第一人称称呼；访问《NSSapp》的自然人或其他主体均成为“您”或其他第二人称；我们和您在本协议中何成为“双方”，我们或您称为“一方”。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第一章 定义和解释</Text>
                        <Text style={styles.tex}>第一条 在本协议中，除非本协议项下条款另有约定，以下词汇或者表述应当具有下述意义：</Text>
                        <Text style={styles.tex}>(一) 本协议 应当包括本服务协议、隐私条款、反洗钱反恐怖融资规则和法律声明以及其他在《NSSapp》上已经发布或将来可能发布的各类规则、附件、声明、说明或指引等构成。</Text>
                        <Text style={styles.tex}>(二) 不可抗力：包括信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、天气原因、意外事故、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争或其他合作方原因、数字资产市场崩溃、政府行为、司法或行政机关的命令、其他不在《NSSapp》可控范围内或《NSSapp》无能力控制的情形。</Text>
                        <Text style={styles.tex}>(三) 关联公司：与其他公司之间存在直接或间接控制关系或重大影响关系的公司；</Text>
                        <Text style={styles.tex}>(四) 知识产权：应当具有本协议第八十六条之意义。</Text>
                        <Text style={styles.tex}>第二条 在本协议中引用的任何法典或者成文法令或者行政规章应当引用其最新的修订版本，无论该修订是在本协议签订之前或者之后做出。</Text>
                        <Text style={styles.tex}>第三条 本协议中任何条款之标题的应用是出于简便的考量，而不应当用于解释协议条款之用途。引用任何陈述，条款，附件，表格是指本协议项下之陈述，条款，附件，表格。</Text>
                        <Text style={styles.tex}>第四条 本协议项下，除非协议中另有要求，在任何情形下使用“包括”一词，应当具有“包括”之意义。</Text>
                        <Text style={styles.tex}>第五条 除非本协议条款另有约定，本协议项下的各个文件相互冲突或者不一致，应当以下述顺序来决定文件的效力以解决冲突或者不一致：</Text>
                        <Text style={styles.tex}>(一) 反洗钱和反恐怖融资规则；</Text>
                        <Text style={styles.tex}>(二) 其他协议、规则和指引。</Text>
                        <Text style={styles.tex}>第六条 用户可以选择使用《NSSapp》的不同语言版本，若存在《NSSapp》的不同语言版本之内容不一致或者相冲突，或遗漏内容之情形，《NSSapp》的中文文本应当优先适用。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第二章 《NSSapp》基本条款</Text>
                        <Text style={styles.tex}>第七条 《NSSapp》中禁止购买方在未打款时，点击已打款，否则会进行封号处理，返还所有货币</Text>
                        <Text style={styles.tex}>第八条 为了保障您的权益，您在自愿注册使用《NSSapp》服务前，必须仔细阅读并充分理解知悉本服务协议所有条款。一经注册或使用《NSSapp》服务即视为对本协议和《NSSapp》对本协议随时做出的任何修改的充分理解和接受；如有违反而导致任何法律后果，您将自己独立承担相应的法律责任。</Text>
                        <Text style={styles.tex}>第九条 在本协议履行过程中，《NSSapp》可根据情况对本协议进行修改。一旦本协议的内容发生变动，《NSSapp》将公布最新的服务协议，不再向用户作个别通知。如果用户不同意《NSSapp》对本协议所做的修改，用户有权停止使用《NSSapp》服务。如果用户继续使用《NSSapp》服务，则视为用户接受《NSSapp》对本协议所做的修改，并应遵照修改后的协议执行。</Text>
                        <Text style={styles.tex}>第十条 《NSSapp》对于用户的通知及任何其他的协议、告示或其他关于用户使用用户账户及服务的通知，用户同意《NSSapp》可通过《NSSapp》公告、站内信、电子邮件、手机短信、无线通讯装置等电子方式或邮寄等物理方式进行，该等通知于发送之日视为已送达收件人 （如以邮寄方式向用户发出通知的，则在该等通知按照用户在《NSSapp》留存的联系地址交邮后的第三个自然日即视为送达）。因不可归责于《NSSapp》的原因（包括电子邮件地址、手机号码、联系地址等不准确或无效、信息传输故障等）导致用户未在前述通知视为送达之日收到该等通知的，《NSSapp》不承担任何责任。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第三章 注册用户</Text>
                        <Text style={styles.tex}>第十一条 在使用NSS交易服务前，用户必须先在APP上进行注册。</Text>
                        <Text style={styles.tex}>第十二条 注册《NSSapp》个人用户的用户应当是年满十八岁或根据其所在国法律规定具有完全民事权利和民事行为能力，能够独立承担民事责任的自然人</Text>
                        <Text style={styles.tex}>第十三条 注册《NSSapp》的用户必须遵守软件的相关协议</Text>
                        <Text style={styles.tex}>第十四条 您一旦点击同意注册按钮，即表示您或您有权代理的机构同意本协议的全部内容，且您本人或您所代理的机构受到本协议之约束。若您不具备本协议第十二条或第十三条所要求之主体资格，则您应承担因此而导致的一切后果，且《NSSapp》保留注销或永久冻结您账户，并向您及您有权代理机构追究责任的权利。</Text>
                        <Text style={styles.tex}>第十五条 您同意根据《NSSapp》用户注册页面的要求提供用户名、电子邮箱、手机号码等信息。</Text>
                        <Text style={styles.tex}>第十六条 在注册前或者注册后，《NSSapp》有权根据用户所在国家或地区的法律法规、规则、命令等规范的要求，向用户要求提供更多的信息或资料等。用户应当配合《NSSapp》提交相关信息或资料，并采取合理的措施以符合当地的规范之要求。</Text>
                        <Text style={styles.tex}>第十七条 用户在此承诺以下事项：</Text>
                        <Text style={styles.tex}>(一) 出于合法交易自身数字资产之目的注册及使用本《NSSapp》，且不具有以《NSSapp》为媒介违反法律法规或破坏数字资产交易秩序之意图；</Text>
                        <Text style={styles.tex}>(二) 用户必须依《NSSapp》要求提示提供真实、最新、有效及完整的资料；</Text>
                        <Text style={styles.tex}>(三) 用户保证并承诺通过《NSSapp》进行交易的资金来源合法；</Text>
                        <Text style={styles.tex}>(四) 用户有义务维持并更新用户的资料，确保其为真实、最新、有效及完整；</Text>
                        <Text style={styles.tex}>(五) 个人用户不为美国之居民，机构用户不为美国注册之公司；</Text>
                        <Text style={styles.tex}>(六) 除本协议以外，用户应同时遵守《NSSapp》不时发布及更新的全部规则，包括公告、产品流程说明、《NSSapp》项目说明、风险提示等。</Text>
                        <Text style={styles.tex}>第十八条 除非用户提交的信息是明显虚假，错误和不完整的，《NSSapp》有权信赖用户所提供的信息。</Text>
                        <Text style={styles.tex}>第十九条 若用户违背本协议第十七之承诺：</Text>
                        <Text style={styles.tex}>(一) 《NSSapp》有权包括停用用户《NSSapp》帐户、拒绝用户使用《NSSapp》服务的部份或全部功能。在此情况下，《NSSapp》不承担任何责任，并且用户同意负担因此所产生的直接或间接的任何支出或损失；</Text>
                        <Text style={styles.tex}>(二) 未及时更新基本资料，导致《NSSapp》服务无法提供或提供时发生任何错误，用户不得将此作为取消交易或拒绝付款的理由，《NSSapp》亦不承担任何责任，所有后果应由用户承担；</Text>
                        <Text style={styles.tex}>(三) 用户应当承担因违背承诺而产生的任何直接或间接损失及不利后果，扣取不当获利，且《NSSapp》保留追究用户责任的权利。</Text>
                        <Text style={styles.tex}>第二十条 在您合法、完整并有效提供注册所需信息并经验证后，注册流程即告结束，用户正式成为《NSSapp》用户，且可在《NSSapp》进行用户登陆。</Text>
                        <Text style={styles.tex}>第二十一条 《NSSapp》发现用户不适合进行高风险投资情形时，有权终止或终止用户对用户账户之使用。</Text>
                        <Text style={styles.tex}>第二十二条 无论本协议其他条款如何规定，《NSSapp》对用户是否能够通过《NSSapp》用户认证，以及是否注销已认证用户之资格具有自由裁量权。《NSSapp》有权拒绝或注销任何用户的注册，且没有义务告知用户拒绝注册之理由，《NSSapp》不承担任何因《NSSapp》拒绝用户注册而导致用户所遭受的直接或间接的损失，且保留追究用户责任的权利。</Text>
                        <Text style={styles.tex}>第二十三条 用户系自愿注册成为《NSSapp》用户，《NSSapp》没有强迫、诱导、欺骗或者通过其他不公平的手段对用户施加影响。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第四章 注册《NSSapp》服务的内容</Text>
                        <Text style={styles.tex}>第二十四条 《NSSapp》对完成注册的用户提供以下服务：</Text>
                        <Text style={styles.tex}>(一) 提供数字资产各项目方所公开的相关信息；</Text>
                        <Text style={styles.tex}>(二) 数字资产各项目的实时行情及交易信息；</Text>
                        <Text style={styles.tex}>(三) 数字资产交易管理服务；</Text>
                        <Text style={styles.tex}>(四) 提供客户服务；</Text>
                        <Text style={styles.tex}>(五) 保障《NSSapp》正常运营的技术和管理服务；</Text>
                        <Text style={styles.tex}>(六) 《NSSapp》公示的其他服务。</Text>
                        <Text style={styles.tex}>第二十五条 《NSSapp》接受数字资产项目方的委托依据本协议第二十四条进行信息发布，为数字资产之间的交易提供撮合服务，《NSSapp》仅对数字资产项目方发布的信息承担文本审查责任，不对信息的准确、完整、合法性做出保证，也不承担相关责任，用户应依其独立判断做出决策。用户据此进行数字资产交易的，产生的风险由用户自行承担，用户无权据此向《NSSapp》提出任何法律主张。用户与数字资产项目方之间因交易发生的或与交易有关的任何纠纷，应由纠纷各方自行解决，《NSSapp》不承担任何交易风险及法律责任。</Text>
                        <Text style={styles.tex}>第二十六条 本协议第二十四条所述之数字资产交易管理服务应当包括以下内容：</Text>
                        <Text style={styles.tex}>(一) 用户账户：用户在《NSSapp》进行注册时将生成用户账户，用户账户将记载用户在《NSSapp》的活动，上述用户账户是用户登陆《NSSapp》的唯一账户。</Text>
                        <Text style={styles.tex}>(二) 数字资产交易：用户可以通过《NSSapp》提交数字资产交易指令，用用户账户中的数字资产交易其他数字资产。</Text>
                        <Text style={styles.tex}>(三) 买币和卖币：用户可以将数字资产在平台中卖出或者买入，价格依据挂卖时的产品价格为准。</Text>
                        <Text style={styles.tex}>(四) 交易状态更新：用户确认，用户在《NSSapp》上按《NSSapp》服务流程所确认的数字资产交易状态，将成为《NSSapp》为用户进行相关交易或操作的不可撤销的指令。用户同意相关指令的执行时间以《NSSapp》在《NSSapp》系统中进行实际操作的时间为准。用户同意《NSSapp》有权依据本协议及/或《NSSapp》相关纠纷处理规则等约定对相关事项进行处理。用户未能及时对交易状态进行修改、确认或未能提交相关申请所引起的任何纠纷或损失由用户自行负责，《NSSapp》不承担任何责任。</Text>
                        <Text style={styles.tex}>(五) 交易指令传递：《NSSapp》依据用户输入交易指令的时间和数据传递交易指令。用户了解《NSSapp》系数字资产交易的撮合方，并不是买家或卖家参与买卖数字资产交易行为本身，且《NSSapp》不提供任何国家法定货币的充入或提取业务。</Text>
                        <Text style={styles.tex}>(六) 交易状态查看：《NSSapp》将对用户在《NSSapp》的所有操作进行记录，不论该操作之目的最终是否实现。用户可以通过用户账户实时查询用户账户名下的交易记录。</Text>
                        <Text style={styles.tex}>(七) 交易安全设置：《NSSapp》有权基于交易安全等方面的考虑不时设定涉及交易的相关事项，包括交易限额、交易次数等，用户了解《NSSapp》的前述设定可能会对交易造成一定不便，对此没有异议。</Text>
                        <Text style={styles.tex}>(八) 系统故障处理：如果《NSSapp》发现了因系统故障或其他任何原因导致的处理错误，无论有利于《NSSapp》还是有利于用户，《NSSapp》都有权纠正该错误。如果该错误导致用户实际收到的数字资产多于应获得的数字资产，则无论错误的性质和原因为何，《NSSapp》保留纠正不当执行的交易的权利，用户应根据《NSSapp》向用户发出的有关纠正错误的通知的具体要求返还多收的数字资产或进行其他操作。用户理解并同意，《NSSapp》不承担因前述处理错误而导致的任何损失或责任。</Text>
                        <Text style={styles.tex}>第二十七条 除了本协议第二十四条项下所列之服务，和《NSSapp》公示的技术性服务，《NSSapp》不能就数字资产交易提供给用户任何投资、法律、税收或其他专业意见，且任何《NSSapp》所提供之任何消息、探讨、分析、价格等信息均为一般评论，不够成对用户进行任何数字资产交易的建议。如果用户需要专业意见，用户应当向相关专业人事咨询数字货币交易有关的投资、法律、税收或其他专业性建议。《NSSapp》不承担用户因依赖上述一般评论而产生的任何直接或间接而产生的损失（包括任何利润损失）。</Text>
                        <Text style={styles.tex}>第二十八条 《NSSapp》提供的服务不应当理解为或被用于向任何认定《NSSapp》所提供之服务为非法的国家或地区的用户发出要约。</Text>
                        <Text style={styles.tex}>第二十九条 用户使用本《NSSapp》进行数字资产交易的过程中应当遵守以下交易规则：</Text>
                        <Text style={styles.tex}>(一) 浏览交易信息：用户在《NSSapp》浏览交易信息时，应当仔细阅读交易信息中包含的全部内容，包括价格、委托量、手续费、买入或卖出方向，用户应当在完全理解并接受交易信息中的全部内容后，再点击按钮进行交易。</Text>
                        <Text style={styles.tex}>(二) 委托之提交：在理解并完全接收交易信息中的全部内容后，用户可以输入数字资产交易信息，确认该信息无误后提交交易委托。一旦用户提交交易委托，则用户授权《NSSapp》代理用户依据用户输入的数字资产交易信息进行相应的交易撮合。用户知悉并同意，当有满足用户委托交易价格的数字资产交易时，用户应及时查看交易信息，确保交易的进程不会被系统完成。</Text>
                        <Text style={styles.tex}>(三) 交易明细之查询：用户可以通过个人账户直中的交易明细中查看相应的数字资产交易成交记录。</Text>
                        <Text style={styles.tex}>(四) 撤销或修改委托：用户知悉，在委托之数字资产交易撮合未锁定之前，用户有权随时撤销或修改交易。</Text>
                        <Text style={styles.tex}>第三十条 《NSSapp》有权基于下述原因修改、暂停或永久停止对用户开放的《NSSapp》之部分或全部服务：</Text>
                        <Text style={styles.tex}>(一) 依据用户所属主权国家或地区的法律法规、规则、命令等规范的要求；</Text>
                        <Text style={styles.tex}>(二) 《NSSapp》出于保护《NSSapp》或客户利益之合法利益；</Text>
                        <Text style={styles.tex}>(三) 数字资产交易规则发生变更；</Text>
                        <Text style={styles.tex}>(四) 其他合理理由。</Text>
                        <Text style={styles.tex}>第三十一条《NSSapp》基于本协议第三十条修改、暂停或永久停止对用户开放的《NSSapp》之部分或全部服务的，生效日以《NSSapp》公告为准。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第五章 账户安全及管理</Text>
                        <Text style={styles.tex}>第三十二条 用户了解并同意，确保用户账户及密码的机密安全是用户的责任。用户将对利用该用户账户及密码所进行的一切行动及言论，负完全的责任，并同意以下事项：</Text>
                        <Text style={styles.tex}>(一) 用户应根据《NSSapp》的相关规则以及《NSSapp》的相关提示创建密码（密码包括但不限于登陆密码、资金密码、注册账户时绑定的手机号码以及手机接收的手机验证码、谷歌验证等，具体形式可能发生变化，下同），应避免选择过于明显的单词或日期，比如用户的姓名、昵称或者生日等；</Text>
                        <Text style={styles.tex}>(二) 用户不对其他任何人泄露账户或密码，亦不可使用其他任何人的账户或密码。因黑客、病毒或用户的保管疏忽等非《NSSapp》原因导致用户的用户账户遭他人非法使用的，《NSSapp》不承担任何责任；</Text>
                        <Text style={styles.tex}>(三) 用户禁止在未经《NSSapp》同意的情形下不得将《NSSapp》账号以赠与、借用、租用、转让或以其他方式处分给第三方；</Text>
                        <Text style={styles.tex}>(四) 《NSSapp》通过用户的用户账户及密码来识别用户的指令，用户确认，使用用户账户和密码登陆后在《NSSapp》的一切行为均代表用户本人。用户账户操作所产生的电子信息记录均为用户行为的有效凭据，并由用户本人承担由此产生的全部责任；</Text>
                        <Text style={styles.tex}>(五) 在《NSSapp》通知用户可能预见的安全风险后，采取措施保障用户账号和密码安全；</Text>
                        <Text style={styles.tex}>(六) 冒用他人账户及密码的，《NSSapp》及其合法授权主体保留追究实际使用人连带责任的权利；</Text>
                        <Text style={styles.tex}>第三十三条 用户如发现有第三人冒用或盗用用户账户及密码，或其他任何未经合法授权的情形，应立即以有效方式通知《NSSapp》，要求《NSSapp》暂停相关服务，否则由此产生的一切责任由用户本人承担。同时，用户理解《NSSapp》对用户的请求采取行动需要合理期限，在此之前，《NSSapp》对第三人使用该服务所导致的损失不承担任何责任。</Text>
                        <Text style={styles.tex}>第三十四条 《NSSapp》有权基于单方独立判断，在其认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止向用户提供本协议项下的全部或部分用户服务（包括收费服务），移除或删除注册资料，扣押不当获利，且无需对用户或任何第三方承担任何责任。前述情形包括：</Text>
                        <Text style={styles.tex}>(一) 《NSSapp》认为用户提供的资料不具有真实性、有效性或完整性，包括盗用他人证件信息注册、认证信息不匹配等；</Text>
                        <Text style={styles.tex}>(二) 《NSSapp》发现异常交易或有疑义或有违法之行为时；</Text>
                        <Text style={styles.tex}>(三) 《NSSapp》认为用户账户涉嫌洗钱、套现、传销、被冒用或其他《NSSapp》认为有风险之情形；</Text>
                        <Text style={styles.tex}>(四) 《NSSapp》发现用户使用非法或不正当的技术手段进行危害交易安全或影响公平交易的行为，包括篡改交易数据、窃取客户信息、窃取交易数据、通过《NSSapp》攻击其他已注册账户等；</Text>
                        <Text style={styles.tex}>(五) 《NSSapp》认为用户已经违反本协议中规定的各类规则及精神；</Text>
                        <Text style={styles.tex}>(六) 用户账户已连续一年内未登录或实际使用且账户中数字资产为零；</Text>
                        <Text style={styles.tex}>(七) 用户违反本协议的其他情形。</Text>
                        <Text style={styles.tex}>(八) 《NSSapp》基于交易安全等原因，根据其单独判断需先行暂停、中断或终止向用户提供本协议项下的全部或部分用户服务（包括收费服务），并将注册资料移除或删除的其他情形。</Text>
                        <Text style={styles.tex}>第三十五条用户决定不再使用用户账户时，应首先清偿所有应付款项（包括服务费、管理费等），再将用户账户中的可用数字资产（如有）在可提取范围全部提取，并向《NSSapp》申请冻结该用户账户，经《NSSapp》审核同意后可正式注销用户账户。</Text>
                        <Text style={styles.tex}>第三十六条 用户同意，如其用户账户未完成身份认证且已经连续一年未登陆，《NSSapp》无需进行事先通知即有权终止提供用户账户服务，并可能立即暂停、关闭或删除用户账户及该用户账户中所有相关资料及档案。</Text>
                        <Text style={styles.tex}>第三十七条 用户同意，用户账户的暂停、中断或终止不代表用户责任的终止，用户仍应对使用《NSSapp》服务期间的行为承担可能的违约或损害赔偿责任，同时《NSSapp》仍可保有用户的相关信息。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第六章 用户的保证及承诺</Text>
                        <Text style={styles.tex}>第三十八条 用户承诺绝不为任何非法目的或以任何非法方式使用《NSSapp》服务，并承诺遵守其所在国的相关法律、法规及一切使用互联网之国际惯例，遵守所有与《NSSapp》服务有关的网络协议、规则和程序。</Text>
                        <Text style={styles.tex}>第三十九条 用户同意并保证不得利用《NSSapp》服务从事侵害他人权益或违法之行为，若有违反者应负所有法律责任。 上述行为包括：</Text>
                        <Text style={styles.tex}>(一) 冒用他人名义使用《NSSapp》服务；</Text>
                        <Text style={styles.tex}>(二) 从事任何不法交易行为，如贩卖枪支、毒品、禁药、盗版软件或其他违禁物；</Text>
                        <Text style={styles.tex}>(三) 提供赌博资讯或以任何方式引诱他人参与赌博；</Text>
                        <Text style={styles.tex}>(四) 涉嫌洗钱、套现或进行传销活动的；</Text>
                        <Text style={styles.tex}>(五) 从事任何可能含有电脑病毒或是可能侵害《NSSapp》服务系統、资料等行为；</Text>
                        <Text style={styles.tex}>(六) 利用《NSSapp》服务系统进行可能对互联网或移动网正常运转造成不利影响之行为；</Text>
                        <Text style={styles.tex}>(七) 恶意干扰数字资产交易正常进行，破坏数字资产交易秩序；</Text>
                        <Text style={styles.tex}>(八) 利用任何技术手段或其他方式干扰《NSSapp》正常运行或干扰其他用户对《NSSapp》服务的使用；</Text>
                        <Text style={styles.tex}>(九) 以虚构、夸大事实等方式恶意诋毁《NSSapp》商誉；</Text>
                        <Text style={styles.tex}>(十) 其他《NSSapp》有正当理由认为不适当之行为。</Text>
                        <Text style={styles.tex}>第四十条 《NSSapp》保有依其单独判断删除《NSSapp》内各类不符合法律政策或不真实或不适当的信息内容而无须通知用户的权利，并无需承担任何责任。若用户未遵守以上规定的，《NSSapp》有权做出独立判断并采取暂停或关闭用户账户等措施，而无需承担任何责任。</Text>
                        <Text style={styles.tex}>第四十一条 用户同意，由于用户违反本协议，或违反通过援引并入本协议并成为本协议一部分的文件，或由于用户使用《NSSapp》服务违反了任何法律或第三方的权利而造成任何第三方进行或发起的任何补偿申请或要求（包括律师费用），用户会对《NSSapp》及其关联方、合作伙伴、董事以及雇员给予全额补偿并使之不受损害。</Text>
                        <Text style={styles.tex}>第四十二条 用户承诺，其通过《NSSapp》上传或发布的信息均真实有效，其向《NSSapp》提交的任何资料均真实、有效、完整、详细、准确。如因违背上述承诺，造成《NSSapp》或《NSSapp》其他使用方损失的，用户将承担相应责任。</Text>
                        <Text style={styles.tex}>第四十三条 用户理解并同意，《NSSapp》向符合条件的用户提供服务。《NSSapp》对在《NSSapp》上进行的数字资产投资或交易行为不承担任何责任，《NSSapp》无法也没有义务保证用户投资成功，用户因投资或交易数字资产原因导致的损失由用户自行承担，《NSSapp》不承担责任。</Text>
                        <Text style={styles.tex}>第四十四条 用户同意对其《NSSapp》注册账号下发生的所有活动（包括信息披露、发布信息、点击同意各类协议、上传提交各类文件、点击同意续签各类协议或点击同意数字货币交易等）承担责任，且如在上述活动进程中，若用户未遵从本协议条款或《NSSapp》公布的交易规则中的操作指示的，《NSSapp》不承担任何责任。</Text>
                        <Text style={styles.tex}>第四十五条 用户同意，《NSSapp》有权在提供《NSSapp》服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息（包括在《NSSapp》的任何页面上投放广告），并且，用户同意接受《NSSapp》通过电子邮件或其他方式向用户发送商业促销或其他相关商业信息。</Text>
                        <Text style={styles.tex}>第四十六条 用户同意，若用户因数字资产交易与项目方或其他第三方产生纠纷的，不得通过司法或行政以外的途径要求《NSSapp》提供相关资料。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第七章 服务中断或故障</Text>
                        <Text style={styles.tex}>第四十七条 用户同意，基于互联网的特殊性，《NSSapp》不担保服务不会中断，也不担保服务的及时性和/或安全性。系统因相关状况无法正常运作，使用户无法使用任何《NSSapp》服务或使用任何《NSSapp》服务时受到任何影响时，《NSSapp》对用户或第三方不负任何责任，前述状况包括：</Text>
                        <Text style={styles.tex}>(一) 《NSSapp》系统停机维护期间。</Text>
                        <Text style={styles.tex}>(二) 电信设备出现故障不能进行数据传输的。</Text>
                        <Text style={styles.tex}>(三) 由于黑客攻击、网络供应商技术调整或故障、网站升级的问题等原因而造成的《NSSapp》服务中断或延迟。</Text>
                        <Text style={styles.tex}>(四) 因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成《NSSapp》系统障碍不能执行业务的。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第八章 责任范围及限制</Text>
                        <Text style={styles.tex}>第四十八条 《NSSapp》未对任何《NSSapp》服务提供任何形式的保证，包括以下事项：</Text>
                        <Text style={styles.tex}>(一) 《NSSapp》服务将符合用户的需求。</Text>
                        <Text style={styles.tex}>(二) 《NSSapp》服务将不受干扰、及时提供或免于出错。</Text>
                        <Text style={styles.tex}>(三) 用户经由《NSSapp》服务购买或取得之任何产品、服务、资讯或其他资料将符合用户的期望。</Text>
                        <Text style={styles.tex}>(四) 《NSSapp》包含的全部信息、程序、文本、数据等完全安全，不受任何病毒、木马等恶意程序的干扰和破坏。</Text>
                        <Text style={styles.tex}>(五) 所有的交易结果计算都经过《NSSapp》核实，相应的计算方法都会在《NSSapp》上进行公示，但是《NSSapp》不能保证其计算没有误差或不受干扰。</Text>
                        <Text style={styles.tex}>第四十九条 用户知悉并同意，在任何情形下，《NSSapp》不会就下列任一事项承担责任：</Text>
                        <Text style={styles.tex}>(一) 用户的收入损失；</Text>
                        <Text style={styles.tex}>(二) 用户的交易利润或合同损失；</Text>
                        <Text style={styles.tex}>(三) 服务中断、中止或终止而引起的损失；</Text>
                        <Text style={styles.tex}>(四) 预期可节省交易成本的损失；</Text>
                        <Text style={styles.tex}>(五) 信息传递问题而造成的损失；</Text>
                        <Text style={styles.tex}>(六) 措施投资或交易机会的损失；</Text>
                        <Text style={styles.tex}>(七) 商誉或声誉的损失；</Text>
                        <Text style={styles.tex}>(八) 数据的遗失或损坏而造成的损失；</Text>
                        <Text style={styles.tex}>(九) 购买替代产品或服务的开销；</Text>
                        <Text style={styles.tex}>(十) 任何由于侵权（包括故意和过失）、违约、或其他任何原因导致的间接的、特殊的或附带性的损失，不论此种损失是否为《NSSapp》所能合理预见，亦不论《NSSapp》是否事先被告知存在此种损失的可能性。</Text>
                        <Text style={styles.tex}>第五十条 用户了解并同意，发生以下任一情形时，《NSSapp》有权拒绝赔偿用户的全部或部分损失：</Text>
                        <Text style={styles.tex}>(一) 《NSSapp》有合理的理由认为用户在《NSSapp》的行为系涉嫌违法或不道德行为。</Text>
                        <Text style={styles.tex}>(二) 用户误以为系《NSSapp》原因造成损失的情形；</Text>
                        <Text style={styles.tex}>(三) 任何非因《NSSapp》原因引起的其他损失。</Text>
                        <Text style={styles.tex}>第五十一条 《NSSapp》服务的合作单位所提供的服务品质及内容由该合作单位自行负责。《NSSapp》的内容可能涉及由第三方所有、控制或者运营的其他网站（以下简称“第三方网站”）。《NSSapp》不能保证也没有义务保证第三方网站上任何信息的真实性和有效性。用户确认按照第三方网站的服务协议使用第三方网站，而不是按照本协议。第三方网站不是《NSSapp》推荐或者介绍的，第三方网站的内容、产品、广告和其他任何信息均由用户自行判断并承担风险，而与《NSSapp》无关。用户经由《NSSapp》服务的使用下载或取得任何资料，应由用户自行考量且自负风险，因资料的下载而导致的任何损坏由用户自行承担。</Text>
                        <Text style={styles.tex}>第五十二条 用户自《NSSapp》及《NSSapp》工作人员或经由《NSSapp》服务取得的建议或资讯，无论其为书面或口头，均不构成《NSSapp》对《NSSapp》服务的任何保证。</Text>
                        <Text style={styles.tex}>第五十三条 《NSSapp》不保证为向用户提供便利而设置的外部链接的准确性、有效性、安全性和完整性，同时，对于该等外部链接指向的不由《NSSapp》实际控制的任何网页上的内容，《NSSapp》不承担任何责任。</Text>
                        <Text style={styles.tex}>第五十四条 在法律允许的情况下，《NSSapp》对于与本协议有关或由本协议引起的，或者，由于使用《NSSapp》、或由于其所包含的或以其他方式通过《NSSapp》提供</Text>
                        <Text style={styles.tex}>第五十七条 《NSSapp》和用户均承认普通法对违约或可能违约情况的救济措施可能不足以弥补守约方遭受的全部或部分损失，故双方同意，协议一方有权在协议另一方违约或可能违约情况下寻求禁令救济以及普通法或衡平法允许的其他所有的补救措施。</Text>
                        <Text style={styles.tex}>第五十八条 《NSSapp》在本协议中做出的保证和承诺是《NSSapp》就其依据本协议提供服务的唯一保证和陈述（以下简称“协议保证”），取代任何其他途径和方式产生的保证和承诺（以下简称“非协议保证”），无论非协议保证是以书面或口头，明示或暗示的形式做出。所有协议保证仅仅由《NSSapp》做出，对《NSSapp》自身具有约束力，其效力不能约束任何第三方。</Text>
                        <Text style={styles.tex}>第五十九条 用户知悉并同意，《NSSapp》并不放弃本协议中未提及的，在法律适用的最大范围内《NSSapp》所享有的限制、免除或抵销《NSSapp》损害赔偿责任的任何权利。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第九章 风险提示</Text>
                        <Text style={styles.tex}>第六十条 用户了解并认可，任何通过《NSSapp》进行的交易并不能避免以下风险的产生，《NSSapp》不能也没有义务为如下风险负责：</Text>
                        <Text style={styles.tex}>(一) 宏观经济风险：因宏观经济形势变化，可能引起价格等方面的异常波动，用户有可能遭受损失；</Text>
                        <Text style={styles.tex}>(二) 政策风险：有关法律、法规及相关政策、规则发生变化，可能引起价格等方面异常波动，用户有可能遭受损失；</Text>
                        <Text style={styles.tex}>(三) 违约风险：因项目方无力或无意愿进行或者继续进行项目开发，而导致的用户有可能遭受损失；</Text>
                        <Text style={styles.tex}>(四) 收益风险：数字资产本身不由任何金融机构或《NSSapp》发行，数字资产市场是全新的、未经确认的，且可能不会带来实际收益增长的市场；</Text>
                        <Text style={styles.tex}>(五) 操盘风险：数字资产主要由投机者大量使用，零售和商业市场使用相对较少，数字资产交易存在极高风险，其全天不间断交易，没有涨跌限制，价格容易受庄家、全球政府政策的影响而大幅波动；</Text>
                        <Text style={styles.tex}>(六)不可抗力因素导致的风险；</Text>
                        <Text style={styles.tex}>(七) 用户过错：因用户的过错导致的任何损失，包括：决策失误、操作不当、遗忘或泄露密码、密码被他人破解、用户使用的计算机系统被第三方侵入、用户委托第三人代理交易时第三人恶意或不当操作而造成的损失。</Text>
                        <Text style={styles.tex}>第六十一条 数字资产交易有极高风险，并不适合绝大部分人士投资。用户知悉并了解此投资有可能导致部分损失或全部损失，所以用户应当以能承受的损失程度来决定其投资或交易的数量。除了本协议第六十条提示的风险外，还会有未能预测的风险存在。用户应慎重评估自己的财政状况，及各项风险，而做出任何数字资产投资或交易的决定。用户应当承担由该决定产生的全部损失，《NSSapp》对用户的投资或交易决定不承担任何责任。</Text>
                        <Text style={styles.tex}>第六十二条 鉴于数字资产投资或交易所衍生的风险，若用户对该种投资或交易由任何疑问，应当在交易或投资前事先寻求专业顾问的协助。</Text>
                        <Text style={styles.tex}>第六十三条 《NSSapp》不对任何用户及/或任何交易提供任何担保或条件，无论是明示、默示或法定的。《NSSapp》不能也不试图对用户或项目方发布的信息进行控制，对该等信息，《NSSapp》不承担任何形式的证明、鉴定服务。《NSSapp》不能完全保证《NSSapp》内容的真实性、充分性、可靠性、准确性、完整性和有效性，并且无需承担任何由此引起的法律责任。用户应依赖于用户的独立判断进行交易，用户应对其做出的判断承担全部责任。</Text>
                        <Text style={styles.tex}>第六十四条 《NSSapp》对于用户使用《NSSapp》服务不做任何明示或暗示的保证，包括但不限于《NSSapp》提供服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，我们也不对《NSSapp》提供的服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性做出任何承诺和保证。</Text>
                        <Text style={styles.tex}>第六十五条 是否登陆或使用《NSSapp》提供的服务是用户个人的决定且自行承担风险及可能产生的损失。《NSSapp》对于数字资产的市场、价值及价格等不做任何明示或暗示的保证，用户知悉并了解数字资产市场的不稳定性，数字资产的价格和价值随时会大幅波动或崩盘，交易数字资产是用户个人的自由选择及决定，且自行承担风险及可能产生的损失。</Text>
                        <Text style={styles.tex}>第六十六条 以上并不能揭示用户通过《NSSapp》进行交易的全部风险及市场的全部情形。用户在做出交易决策前，应全面了解相关数字资产，根据自身的交易目标、风险承受能力和资产状况等谨慎决策，并自行承担全部风险。</Text>
                        <Text style={styles.tex}>第六十七条 在任何情况下，对于用户使用《NSSapp》服务过程中涉及由第三方提供相关服务的责任由该第三方承担，《NSSapp》不承担该等责任。</Text>
                        <Text style={styles.tex}>第六十八条 因用户自身的原因导致的任何损失或责任，由用户自行负责，《NSSapp》不承担责任。《NSSapp》不承担责任的情形包括：</Text>
                        <Text style={styles.tex}>(一) 用户未按照本协议或《NSSapp》不时公布的任何规则进行操作导致的任何损失或责任；</Text>
                        <Text style={styles.tex}>(二) 因用户向《NSSapp》发送的指令信息不明确、或存在歧义、不完整等导致的任何损失或责任；</Text>
                        <Text style={styles.tex}>(三) 用户账户内数字资产余额不足导致的任何损失或责任；</Text>
                        <Text style={styles.tex}>(四) 其他因用户原因导致的任何损失或责任。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第十章 服务费用及其他费用</Text>
                        <Text style={styles.tex}>第六十九条 当用户使用《NSSapp》服务时，《NSSapp》可能向用户收取相关《NSSapp》服务费用。各项《NSSapp》服务费用详见用户使用《NSSapp》服务时，《NSSapp》上所列之收费说明及收费标准。《NSSapp》保留单方面制定及调整《NSSapp》服务费用收费标准的权利。</Text>
                        <Text style={styles.tex}>第七十条 用户在使用《NSSapp》服务过程中可能需要向第三方支付一定的第三方服务费用，具体收费标准详见第三方网站相关页面，或《NSSapp》的提示及收费标准。用户同意将根据上述收费标准自行或委托《NSSapp》或《NSSapp》指定的第三方代为向第三方支付该等服务费。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第十一章 协议之终止</Text>
                        <Text style={styles.tex}>第七十一条 用户有权在任何时候依据本协议条款之规定向《NSSapp》申请注销《NSSapp》账号，依据本协议第三十五条注销账号的，自《NSSapp》批准用户注销账号之日起协议终止。</Text>
                        <Text style={styles.tex}>第七十二条 依据本协议第三十五条、三十六条注销账号的，自《NSSapp》注销用户账号之日起协议终止。</Text>
                        <Text style={styles.tex}>第七十三条 用户死亡或被宣告死亡的，其在本协议项下的各项权利义务由其继承人承担。若用户丧失全部或部分民事权利能力或民事行为能力，《NSSapp》或其授权的主体有权根据有效法律文书（包括生效的法院判决等）或其法定监护人的指示处置与用户账户相关的款项。若继承人或法定监护人决定继续履行本协议的，则本协议依然有效；反之，则继承人或法定监护人需要依据本协议第三十五条向《NSSapp》申请注销账号，自《NSSapp》批准用户注销账号之日起协议终止。</Text>
                        <Text style={styles.tex}>第七十四条 《NSSapp》有权依据本协议约定终止《NSSapp》全部服务，本协议于《NSSapp》全部服务终止之日终止，清退流程根据《NSSapp》公告的具体规定进行操作。</Text>
                        <Text style={styles.tex}>第七十五条 本协议终止后，用户无权要求《NSSapp》继续向其提供任何服务或履行任何其他义务，包括但不限于要求《NSSapp》为用户保留或向用户披露其原本网站账号中的任何信息， 向用户或第三方转发任何其未曾阅读或发送过的信息等。</Text>
                        <Text style={styles.tex}>第七十六条 本协议的终止不影响守约方向违约方主张其他协议终止前违约方之违约责任，也不影响本协议规定之后合同义务之履行。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第十二章 个人信息之保护和授权条款</Text>
                        <Text style={styles.tex}>第七十七条 本协议第十二章中之个人信息应当包括以下信息：</Text>
                        <Text style={styles.tex}>(一) 在用户注册《NSSapp》账号或者使用账户时，用户根据本《NSSapp》要求提供的个人注册信息，包括但不限于电话号码、邮箱信息、身份证件信息；</Text>
                        <Text style={styles.tex}>(二) 在用户使用《NSSapp》时，或访问《NSSapp》时，《NSSapp》自动接收并记录的用户浏览器上的服务器数值，包括但不限于IP地址等数据及用户要求取用的网页记录；</Text>
                        <Text style={styles.tex}>(三) 《NSSapp》收集到的用户在《NSSapp》进行交易的有关数据，包括但不限于交易记录；</Text>
                        <Text style={styles.tex}>(四) 《NSSapp》通过合法途径取得的其他用户个人信息。</Text>
                        <Text style={styles.tex}>第七十八条 不需要用户额外的同意，用户在《NSSapp》注册成功即视为用户同意《NSSapp》收集并使用或披露其个人信息，且用户了解并同意，基于为用户度身订造《NSSapp》服务、解决争议并有助确保在《NSSapp》进行安全交易的考量，《NSSapp》可以将收集的用户个人信息用作下列用途包括：</Text>
                        <Text style={styles.tex}>(一) 向用户提供《NSSapp》服务；</Text>
                        <Text style={styles.tex}>(二) 基于主权国家或地区相关主管部门的要求向相关部门进行报告；</Text>
                        <Text style={styles.tex}>(三) 在用户使用《NSSapp》服务时，《NSSapp》将用户的信息用于身份验证、客户服务、安全防范、诈骗监测、市场推广、存档和备份用途，或与第三方合作推广网站等合法用途，确保《NSSapp》向用户提供的产品和服务的安全性；收集和整理；</Text>
                        <Text style={styles.tex}>(五) 为了使用户了解《NSSapp》服务的具体情况，用户同意《NSSapp》向其发送营销活动通知、商业性电子信息以及提供与用户相关的广告以替代普遍投放的广告；</Text>
                        <Text style={styles.tex}>(六) 《NSSapp》为完成合并、分立、收购或资产转让而将用户的信息转移或披露给任何非关联的第三方；</Text>
                        <Text style={styles.tex}>(七) 软件认证或管理软件升级；</Text>
                        <Text style={styles.tex}>(八) 邀请用户参与有关《NSSapp》服务的调查；</Text>
                        <Text style={styles.tex}>(九) 用于和政府机关、公共事务机构、协会等合作的数据分析；</Text>
                        <Text style={styles.tex}>(十) 用于解决争议或对纠纷进行调停；</Text>
                        <Text style={styles.tex}>(十一) 用作其他一切合法目的以及经用户授权的其他用途。</Text>
                        <Text style={styles.tex}>第七十九条 《NSSapp》按照用户在《NSSapp》上的行为自动追踪关于用户的某些资料。在不透露用户的隐私资料的前提下，《NSSapp》有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</Text>
                        <Text style={styles.tex}>第八十条 用户同意，《NSSapp》可在《NSSapp》的某些网页上使用诸如“Cookies”的资料收集装置。</Text>
                        <Text style={styles.tex}>第八十一条 《NSSapp》根据相关法律法规以保护用户的资料。用户因履行本协议提供给《NSSapp》的信息，《NSSapp》不会恶意出售或免费共享给任何第三方，以下情况除外：</Text>
                        <Text style={styles.tex}>(一) 提供独立服务且仅要求服务相关的必要信息的供应商；</Text>
                        <Text style={styles.tex}>(二) 具有合法调阅信息权限并从合法渠道调阅信息的政府部门或其他机构；</Text>
                        <Text style={styles.tex}>(三) 《NSSapp》的关联公司；</Text>
                        <Text style={styles.tex}>(四) 经《NSSapp》使用方或《NSSapp》使用方授权代表同意的第三方。</Text>
                        <Text style={styles.tex}>第八十二条授权《NSSapp》，除法律另有规定之外，将用户提供给《NSSapp》的信息、享受《NSSapp》服务产生的信息（包括本协议签署之前提供和产生的信息）以及《NSSapp》根据本条约定查询、收集的信息，用于《NSSapp》及其因服务必要委托的合作伙伴为用户提供服务、推荐产品、开展市场调查与信息数据分析。</Text>
                        <Text style={styles.tex}>第八十三条 授权《NSSapp》，除法律另有规定之外，基于为用户提供更优质服务和产品的目的，向《NSSapp》因服务必要开展合作的伙伴提供、查询、收集用户的信息。</Text>
                        <Text style={styles.tex}>第八十四条 为确保用户信息的安全，《NSSapp》及其合作伙伴对上述信息负有保密义务，并采取各种措施保证信息安全。</Text>
                        <Text style={styles.tex}>第八十五条 本协议第十二章项下之条款自本协议签署时生效，具有独立法律效力，不受合同成立与否及效力状态变化的影响。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第十三章 知识产权的保护</Text>
                        <Text style={styles.tex}>第八十六条《NSSapp》上所有内容，包括著作、图片、档案、资讯、资料、《NSSapp》架构、《NSSapp》画面的安排、《NSSapp》设计，文字和图表，软件编译，相关源代码和软件等均由《NSSapp》或其他权利人依法拥有其知识产权，包括商标权、专利权、著作权、商业秘密等。</Text>
                        <Text style={styles.tex}>第八十七条 非经《NSSapp》或其他权利人书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表《NSSapp》程序或内容。</Text>
                        <Text style={styles.tex}>第八十八条 用户未经《NSSapp》的明确书面同意不许下载（除了页面缓存）或修改《NSSapp》或其任何部分。用户不得对《NSSapp》或其内容进行转售或商业利用；不得收集和利用产品目录、说明和价格；不得对《NSSapp》或其内容进行任何衍生利用；不得为其他商业利益而下载或拷贝账户信息或使用任何数据采集、Robots或类似的数据收集和摘录工具。未经《NSSapp》的书面许可，严禁对《NSSapp》的内容进行系统获取以直接或间接创建或编辑文集、汇编、数据库或人名地址录（无论是否通过Robots、Spiders、自动仪器或手工操作）。另外，严禁为任何未经本使用条件明确允许的目的而使用《NSSapp》上的内容和材料。</Text>
                        <Text style={styles.tex}>第八十九条 未经《NSSapp》明确书面同意，不得以任何商业目的对《NSSapp》网站或其任何部分进行复制、复印、仿造、出售、转售、访问、或以其他方式加以利用。未经《NSSapp》明确书面同意，用户不得用任何技巧把《NSSapp》或其关联公司的商标、标识或其他专有信息（包括图像、文字、网页设计或形式）据为己有。未经《NSSapp》明确书面同意，用户不得以Meta Tags或任何其他"隐藏文本"方式使用《NSSapp》或其关联公司的名字和商标。任何未经授权的使用都会终止《NSSapp》所授予的允许或许可。</Text>
                        <Text style={styles.tex}>第九十条 用户登陆《NSSapp》或使用《NSSapp》提供的任何服务均不视为《NSSapp》向用户转让任何知识产权。尊重知识产权是用户应尽的义务，如有违反，用户应对《NSSapp》承担损害赔偿等法律责任。</Text>
                        <Text style={[styles.tex,styles.ltex]}>第十四章 一般条款</Text>
                        <Text style={styles.tex}>第九十一条本协议是由用户与《NSSapp》共同签订的，适用于用户在《NSSapp》的全部活动。本协议内容包括协议正文条款及已经发布的或将来可能发布的各类规则，所有条款和规则为协议不可分割的一部分，与本协议正文具有同等法律效力。</Text>
                        <Text style={styles.tex}>第九十二条 如本协议中的任何条款被任何有管辖权的机构认定为不可执行的，无效的或非法的，并不影响本协议的其余条款的效力。</Text>
                        <Text style={styles.tex}>第九十三条 本协议中约定的权利及义务同样约束通过转让从该权利义务中获取到利益的各方的受让人，继承人，遗嘱执行人和管理员。用户不得在我们不同意的前提下将本协议项下的权利或义务转让给任何第三方，但《NSSapp》可随时将我们在本协议中的权利和义务转让给任何第三方，并于转让之日提前三十（30）天给与用户通知。</Text>
                        <Text style={styles.tex}>第九十四条如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，则应认为该条款可与本协议相分割，并可被尽可能接近各方意图的、能够保留本协议要求的经济目的的、有效的新条款所取代，而且，在此情况下，本协议的其他条款仍然完全有效并具有约束力。</Text>
                        <Text style={styles.tex}>第九十五条 除非本协议中的其他条款另有约定，本协议中的任何规定均不应当被认为创造了、暗示了或以其他方式将《NSSapp》视为用户的代理人、受托人或其他代表人。</Text>
                        <Text style={styles.tex}>第九十六条 本协议任何一方未能就单一事件行使与本协议有关的权利或寻求救济，并不影响该缔约方随后就该单一事件或者在其他事件后行使该权利或者寻求救济。</Text>
                        <Text style={styles.tex}>第九十七条 对违约行为的豁免，或本协议任一条款的放弃，仅在守约方或非寻求放弃方书面签字同意豁免后方能生效。任何本协议项下的违约豁免，不能认定或解释为守约方对其后再次违约或其他违约行为的豁免；未行使任何权利或救济不得以任何方式被解释为对该等权利或救济的放弃。</Text>
                        <Text style={styles.tex}>第九八条 本协议自用户获得本《NSSapp》账号时生效，对协议双方具有约束力。</Text>
                        <Text style={styles.tex}>第九九条 本协议的最终解释权归《NSSapp》所有。</Text>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    arroWrap: {
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
        // paddingLeft: 22,
        backgroundColor:'#3D72E4'
    },
    arrow: {
        width: 11.82,
        height: 22,
    },
    title: {
        marginLeft: 36,
        color: '#fff',
        fontSize: 18,
        fontWeight: "500",
        fontFamily: 'PingFang SC',
    },
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#F8F9FA',
        paddingLeft:10,
        paddingRight:10,
    },
    tex: {
        fontSize: 14,
        color: '#2B2D33',
        marginBottom:18
    },
    ltex:{
        fontSize:18,
        fontWeight:'bold'
    }
})