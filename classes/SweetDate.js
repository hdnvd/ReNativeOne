// @flow
import jMoment from "moment-jalaali";
import moment from "moment";
export default class SweetDate{
    static getCurrentTimeJMomentFromDateTimeStamp(TimeStamp)
    {
        let DateFormat="jYYYY/jMM/jDD";
        let DateString=jMoment.utc(moment.unix(TimeStamp)).format(DateFormat);
        const JalaliMoment=jMoment(DateString, DateFormat);
        return JalaliMoment;
    }
}
