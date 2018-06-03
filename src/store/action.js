import {
	getStudentById
} from '../service/getData'
import {
	getStore
} from '../config/mUtils'
import {
	GET_USERINFO
} from './mutation-types.js'

export default {

	async getUserInfo({
		commit,
		state
	}) {
		getStudentById(getStore("user_id")).then(res => {
                if(res&&(!res.status))
                    {
                        commit(GET_USERINFO, res)
                }
            });
	},
}