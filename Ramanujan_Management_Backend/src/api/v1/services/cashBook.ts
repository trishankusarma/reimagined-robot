import { CashBook } from '../models';
import { Model } from 'mongoose';
/**
 *
 *  @CashBookService by Trishanku Sarma
 *
 **/

class CashBookService {
    private _CashBookModel;

    constructor({ CashBookModel }: { CashBookModel: Model<CashBook> }) {
        this._CashBookModel = CashBookModel;
    }

    /** @Post */

    async add_to_cashBook(cashbook: any) {
        // date , receipts , payments, bankTransfer , department , particular , remarks
        // opening_cash_in_bank , opening_cash_in_hand , closing_cash_in_bank , closing_cash_in_hand

        try {
            let data;

            let alreadyExist = await this._CashBookModel.findOne({
                date: cashbook.date,
                department: cashbook.department
            });

            console.log('already', alreadyExist);

            const cashbook_bankTransfer = cashbook.bankTransfer;

            if (alreadyExist) {
                cashbook = {
                    ...cashbook,
                    receipts: cashbook.receipts ? parseInt(cashbook.receipts) + parseInt(alreadyExist.receipts) : alreadyExist.receipts,
                    payments: cashbook.payments ? parseInt(cashbook.payments) + parseInt(alreadyExist.payments) : alreadyExist.payments,

                    bankTransfer: cashbook.bankTransfer ? parseInt(cashbook.bankTransfer) + parseInt(alreadyExist.bankTransfer) : alreadyExist.bankTransfer,

                    closing_cash_in_hand: cashbook.receipts
                        ? parseInt(alreadyExist.closing_cash_in_hand) + parseInt(cashbook.receipts)
                        : cashbook.payments
                        ? parseInt(alreadyExist.closing_cash_in_hand) - parseInt(cashbook.payments)
                        : parseInt(alreadyExist.closing_cash_in_hand),

                    closing_cash_in_bank: parseInt(alreadyExist.closing_cash_in_bank)
                };

                if (cashbook_bankTransfer) {
                    cashbook = {
                        ...cashbook,

                        closing_cash_in_hand: parseInt(alreadyExist.closing_cash_in_hand) - parseInt(cashbook.bankTransfer),
                        closing_cash_in_bank: parseInt(cashbook.closing_cash_in_bank) + parseInt(cashbook.bankTransfer)
                    };
                }

                console.log(cashbook, 'cashbook');

                data = await this._CashBookModel.findByIdAndUpdate(alreadyExist._id, cashbook);
                data.save();

                return data;
            }

            const lastUpdated = await this._CashBookModel
                .find({
                    department: cashbook.department
                })
                .sort({ _id: -1 })
                .limit(1);

            console.log(lastUpdated, 'lastUpdated');

            if (lastUpdated.length == 0) {
                cashbook = {
                    ...cashbook,
                    opening_cash_in_bank: 0,
                    opening_cash_in_hand: 0,
                    receipts: cashbook.receipts ? cashbook.receipts : 0,
                    payments: cashbook.payments ? cashbook.payments : 0,
                    bankTransfer: cashbook.bankTransfer ? cashbook.bankTransfer : 0,
                    closing_cash_in_hand: cashbook.receipts ? cashbook.receipts : cashbook.payments ? -1 * parseInt(cashbook.payments) : 0,
                    closing_cash_in_bank: 0
                };
                if (cashbook_bankTransfer) {
                    cashbook = {
                        ...cashbook,
                        closing_cash_in_hand: -1 * parseInt(cashbook.bankTransfer),
                        closing_cash_in_bank: parseInt(cashbook.bankTransfer)
                    };
                }
            } else {
                cashbook = {
                    ...cashbook,

                    opening_cash_in_hand: lastUpdated[0].closing_cash_in_hand,
                    opening_cash_in_bank: lastUpdated[0].closing_cash_in_bank,

                    closing_cash_in_hand: cashbook.receipts
                        ? parseInt(lastUpdated[0].closing_cash_in_hand) + parseInt(cashbook.receipts)
                        : cashbook.payments
                        ? parseInt(lastUpdated[0].closing_cash_in_hand) - parseInt(cashbook.payments)
                        : parseInt(lastUpdated[0].closing_cash_in_hand),
                    closing_cash_in_bank: lastUpdated[0].closing_cash_in_bank
                };

                if (cashbook_bankTransfer) {
                    cashbook = {
                        ...cashbook,

                        closing_cash_in_hand: parseInt(cashbook.opening_cash_in_hand) - parseInt(cashbook.bankTransfer),
                        closing_cash_in_bank: parseInt(cashbook.opening_cash_in_bank) + parseInt(cashbook.bankTransfer)
                    };
                }
            }

            console.log(cashbook, 'cashbook');

            data = await this._CashBookModel.create(cashbook);
            data.save();

            return data;
        } catch (error) {
            console.log(error, 'cash book');
            throw error;
        }
    }

    /** @Get */

    async getAllcashBook(From_Date: string, To_date: string, department: String) {
        try {
            const curr_to_date = new Date(To_date);
            curr_to_date.setDate(curr_to_date.getDate() + 1);

            const data = await this._CashBookModel.find({
                department: department,

                date: {
                    $gte: new Date(From_Date).toISOString(),
                    $lt: new Date(curr_to_date).toISOString()
                }
            });

            return data;
        } catch (error) {
            console.log(error, 'cash book');
            throw error;
        }
    }

    /** @Get */
    async getOnecashBook(date: string, department: string) {
        try {
            let data = await this._CashBookModel.find({
                date: new Date(date).toISOString(),
                department: department
            });

            console.log(new Date(date).toISOString(), department, data);

            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default CashBookService;
