export class MailingAddress{
   constructor( 
                public mailingAddress1: string,
                public mailingAddress2:string,
                public mailingCity:string,
                public mailingState:string,
                public mailingZip:string,
                public mailingCountry:string,
                public physicalAddress1:string,
                public physicalAddress2:string,
                public physicalCity:string,
                public physicalState:string,
                public physicalZip:string,
                public physicalCountry:string,
                public token:string
            ){}     
}
