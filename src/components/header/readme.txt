Add the below code in the  html file
<pf-header leftIcon="toggleMenu" rightIcon="mail">
    <pf-header-title>AUTO LOANS</pf-header-title>
</pf-header>
 
leftIcon and rightIcon can be any value as per icon
Add the below code in module.ts file as per the file path.
import { HeaderComponentModule } from '../../components/header/header.module';

Import the component in imports : [ HeaderComponentModule ]

If the user is logged in, then we can add the below condition in header component.
<pf-header *ngIf="this.fromLogin" leftIcon="back" rightIcon="mail">
    <pf-header-title>CONTACT US</pf-header-title>
</pf-header>

In place of logged in condition, user can check for other conditions as well.
For.e.g.
<pf-header *ngIf="!navParams.data.fromAccount" leftIcon="toggleMenu" rightIcon="mail">
    <pf-header-title>MAKE DEPOSIT (1 OF 2)</pf-header-title>
</pf-header>
Page title will be nothing but header title. I have created it as sub component which will take input from user.
