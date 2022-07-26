import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { PartyReferenceV1Schema } from '../data/version1/PartyReferenceV1Schema';
import { FeedbackV1Schema } from '../data/version1/FeedbackV1Schema';
import { IFeedbacksController } from './IFeedbacksController';

export class FeedbacksCommandSet extends CommandSet {
    private _logic: IFeedbacksController;

	constructor(logic: IFeedbacksController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetFeedbacksCommand());
		this.addCommand(this.makeGetFeedbackByIdCommand());
		this.addCommand(this.makeSendFeedbackCommand());
		this.addCommand(this.makeReplyFeedbackCommand());
		this.addCommand(this.makeDeleteFeedbackByIdCommand());
	}

	private makeGetFeedbacksCommand(): ICommand {
		return new Command(
			"get_feedbacks",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getFeedbacks(correlationId, filter, paging);
			}
		);
	}

	private makeGetFeedbackByIdCommand(): ICommand {
		return new Command(
			"get_feedback_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('feedback_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let feedbackId = args.getAsNullableString("feedback_id");
				return await this._logic.getFeedbackById(correlationId, feedbackId);
			}
		);
	}

	private makeSendFeedbackCommand(): ICommand {
		return new Command(
			"send_feedback",
			new ObjectSchema(true)
				.withRequiredProperty('feedback', new FeedbackV1Schema())
				.withOptionalProperty('user', new PartyReferenceV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let feedback = args.get("feedback");
				let user = args.get("user");
				return await this._logic.sendFeedback(correlationId, feedback, user);
			}
		);
	}

	private makeReplyFeedbackCommand(): ICommand {
		return new Command(
			"reply_feedback",
			new ObjectSchema(true)
				.withRequiredProperty('feedback_id', TypeCode.String)
				.withRequiredProperty('reply', TypeCode.String)
				.withRequiredProperty('user', new PartyReferenceV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let feedbackId = args.getAsNullableString("feedback_id");
				let reply = args.getAsNullableString("reply");
				let user = args.get("user");
				return await this._logic.replyFeedback(correlationId, feedbackId, reply, user);
			}
		);
	}

	private makeDeleteFeedbackByIdCommand(): ICommand {
		return new Command(
			"delete_feedback_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('feedback_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let feedbackId = args.getAsNullableString("feedback_id");
				return await this._logic.deleteFeedbackById(correlationId, feedbackId);
			}
		);
	}

}