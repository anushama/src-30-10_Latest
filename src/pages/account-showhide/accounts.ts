export class Accounts {
   constructor( 
                
                public accountMask : string,
                public numLast4 : number,
                public fullName : string,
                public nickname : string,
                public currentBal : number,
                public asOfDate : Date,
                public acctType :string,
                public parentAcctType : string,
                public showAccount : boolean,
                public availableBal : number,
                public ableToRemoteDeposit : boolean,
                public accountNum : number,
                public routingNumber : string

           

            ){}     
}