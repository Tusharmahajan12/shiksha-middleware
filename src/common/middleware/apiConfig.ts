'use strict';
/**
 * @file - Sourcing Portal Backend API(s) list
 * @description - Whitelisted URL(s)
 * @since release-4.1.0
 * @version 1.0
 */

/* create dynamic object
sample input
``
  {
        'get' :  {
    PRIVILEGE_CHECK: ['users.create'], // Specific values for each check
    ROLE_CHECK: ['teacher', 'admin', 'team_leader'], // Specific values for each check
    DATA_TENANT: [],
      DATA_CONTEXT: [],
      DATA_TENANT_CONTEXT: [],
  },
        'patch':  {
    PRIVILEGE_CHECK: ['users.create'], // Specific values for each check
    ROLE_CHECK: ['teacher', 'admin', 'team_leader'] ,// Specific values for each check
      DATA_TENANT_CONTEXT: [],
  },
        'delete':{},
        
        'test':{}
  }
``
sample output from above input
``
{
  method: [ 'get', 'patch', 'delete', 'test' ],
  get: {
    checksNeeded: [
      'PRIVILEGE_CHECK',
      'ROLE_CHECK',
      'DATA_TENANT',
      'DATA_CONTEXT',
      'DATA_TENANT_CONTEXT'
    ],
    PRIVILEGE_CHECK: [ 'users.create' ],
    ROLE_CHECK: [ 'teacher', 'admin', 'team_leader' ],
    DATA_TENANT: [],
    DATA_CONTEXT: [],
    DATA_TENANT_CONTEXT: []
  },
  patch: {
    checksNeeded: [ 'PRIVILEGE_CHECK', 'ROLE_CHECK', 'DATA_TENANT_CONTEXT' ],
    PRIVILEGE_CHECK: [ 'users.create' ],
    ROLE_CHECK: [ 'teacher', 'admin', 'team_leader' ],
    DATA_TENANT_CONTEXT: []
  },
  delete: { checksNeeded: [] },
  test: { checksNeeded: [] }
}
``
 */
const rolesGroup = {
  common: ['admin', 'center_admin', 'trainer', 'youth'],

  center_admin: ['center_admin', 'center'],
  trainer: ['trainer', 'center_admin', 'center'],
  youth: ['youth'],

  admin_center_admin: ['admin', 'center_admin'],
  admin_center_admin_trainer: ['admin', 'trainer', 'center_admin'],
  center_admin_trainer: ['trainer', 'center_admin'],
  admin_center_admin_trainer_youth: [
    'admin',
    'trainer',
    'center_admin',
    'youth',
  ],
};
const createPrivilegeGroup = (entity: string) => {
  return {
    create: [`${entity}.create`],
    read: [`${entity}.read`],
    update: [`${entity}.update`],
    delete: [`${entity}.delete`],
    review: [`${entity}.review`],
    approve: [`${entity}.approve`],
    publish: [`${entity}.publish`],
  };
};
const privilegeGroup = {
  tracking: createPrivilegeGroup('tracking'),
  content: createPrivilegeGroup('content'),
  users: createPrivilegeGroup('users'),
  cohort: createPrivilegeGroup('cohort'),
  cohortmembers: createPrivilegeGroup('cohortmembers'),
  attendance: createPrivilegeGroup('attendance'),
  event: createPrivilegeGroup('event'),
  opportunity: createPrivilegeGroup('opportunity'),
};
const common_public_get = { get: {} };
const common_role_check = { ROLE_CHECK: rolesGroup.admin_center_admin };
const createRouteObject = (
  methods: any,
  redirectUrl: string | null = null,
  changeResponse: boolean | null = false,
) => {
  const allMethods = Object.keys(methods); // Extract method names (e.g., 'get', 'patch', 'delete')

  const methodObject = allMethods.reduce((acc, method) => {
    const checks = methods[method];
    const checksNeeded = Object.keys(checks); // Extract check keys for each method

    acc[method] = {
      checksNeeded: checksNeeded, // Add checksNeeded for each method
      ...checks, // Spread the original checks object for each method
    };

    return acc;
  }, {});
  return {
    method: allMethods,
    ...methodObject,
    redirectUrl, // Optionally include redirectUrl if it's passed
    changeResponse, // Optionally include changeResponse if it's passed
  };
};

export const apiList = {
  //Opportunity Service API
  '/opportunity-service/opportunities': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.create,
    },
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/opportunities/:id': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    put: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/opportunities/:id/archive': createRouteObject({
    patch: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),

  '/opportunity-service/skills': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/skills/:id': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    patch: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    delete: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/categories': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/categories/:id': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    patch: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    delete: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/organizations': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/organizations/:id': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    patch: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    delete: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/locations': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/benefits': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/benefits/:id': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    patch: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    delete: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/locations/list': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/locations/:id': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    patch: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    delete: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/opportunity-applications/:id': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    put: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/opportunity-applications': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  '/opportunity-service/opportunity-applications/:id/archive':
    createRouteObject({
      patch: {
        ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
        PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
      },
    }),
  '/opportunity-service/application-statuses': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.opportunity.read,
    },
  }),
  //tenant api
  '/user/v1/tenant/read': createRouteObject({
    get: {},
  }),
  //tenant Search API
  '/user/v1/tenant/search': createRouteObject({
    post: {},
  }),
  //public api
  '/user/v1/auth/login': createRouteObject({
    post: {},
  }),
  //public api
  '/prathamservice/v1/import-user': createRouteObject({
    post: {},
  }),
  //public api for run cron job for send event notification
  '/prathamservice/v1/cronjob': createRouteObject({
    get: {},
  }),
  //user-service
  '/user/v1/auth': createRouteObject(common_public_get),
  //Need confirmation in to self registration
  '/user/v1/create': createRouteObject({
    post: {
      // PRIVILEGE_CHECK: privilegeGroup.users.create,
      // ROLE_CHECK: rolesGroup.admin_team_leader_teacher,
    },
  }),
  '/user/v1/read/:userId': createRouteObject({
    get: {
      PRIVILEGE_CHECK: privilegeGroup.users.read,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer_youth,
    },
  }),
  '/user/v1/update/:userId': createRouteObject({
    patch: {
      PRIVILEGE_CHECK: privilegeGroup.users.update,
      ROLE_CHECK: rolesGroup.admin_center_admin.concat(rolesGroup.youth),
    },
  }),
  '/user/v1/delete/:userId': createRouteObject({
    delete: {
      PRIVILEGE_CHECK: privilegeGroup.users.delete,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/user/v1/list': createRouteObject({
    post: {
      PRIVILEGE_CHECK: privilegeGroup.users.read,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer_youth,
    },
  }),
  //need confirmation
  '/user/v1/password-reset-link': createRouteObject({
    post: {
      // PRIVILEGE_CHECK: privilegeGroup.users.delete,
      // ROLE_CHECK: rolesGroup.admin_team_leader_teacher,
    },
  }),
  '/user/v1/password-reset-otp': createRouteObject({
    post: {
      // PRIVILEGE_CHECK: privilegeGroup.users.delete,
      // ROLE_CHECK: rolesGroup.admin_team_leader_teacher,
    },
  }),
  //need confirmation
  '/user/v1/forgot-password': createRouteObject({
    post: {
      // PRIVILEGE_CHECK: privilegeGroup.users.delete,
      // ROLE_CHECK: rolesGroup.admin_team_leader_teacher,
    },
  }),
  //all
  '/user/v1/reset-password': createRouteObject({
    post: {
      checksNeeded: [],
    },
  }),
  '/user/v1/check': createRouteObject({
    post: {},
  }),
  '/user/v1/suggestUsername': createRouteObject({
    post: {},
  }),
  '/user/v1/auth/refresh': createRouteObject({
    post: {},
  }),
  //cohort
  '/user/v1/cohort/cohortHierarchy/:cohortId': createRouteObject({
    get: {
      PRIVILEGE_CHECK: privilegeGroup.cohort.read,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/user/v1/cohort/create': createRouteObject({
    post: {
      PRIVILEGE_CHECK: privilegeGroup.cohort.create,
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/cohort/search': createRouteObject({
    post: {
      PRIVILEGE_CHECK: privilegeGroup.cohort.read,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/user/v1/cohort/update/:cohortId': createRouteObject({
    put: {
      PRIVILEGE_CHECK: privilegeGroup.cohort.update,
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/cohort/delete/:cohortId': createRouteObject({
    delete: {
      PRIVILEGE_CHECK: privilegeGroup.cohort.delete,
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/cohort/mycohorts/:userId': createRouteObject({
    get: {
      PRIVILEGE_CHECK: privilegeGroup.cohort.read,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer.concat(
        rolesGroup.youth,
      ),
    },
  }),
  //cohort member
  '/user/v1/cohortmember/create': createRouteObject({
    post: {
      PRIVILEGE_CHECK: privilegeGroup.cohortmembers.create,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/user/v1/cohortmember/read/:cohortId': createRouteObject({
    get: {
      PRIVILEGE_CHECK: privilegeGroup.cohortmembers.read,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/user/v1/cohortmember/list': createRouteObject({
    post: {
      PRIVILEGE_CHECK: privilegeGroup.cohortmembers.read,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/user/v1/cohortmember/update/:cohortmembershipid': createRouteObject({
    put: {
      PRIVILEGE_CHECK: privilegeGroup.cohortmembers.update,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/user/v1/cohortmember/delete/:id': createRouteObject({
    delete: {
      PRIVILEGE_CHECK: privilegeGroup.cohortmembers.delete,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/user/v1/cohortmember/bulkCreate': createRouteObject({
    post: {
      PRIVILEGE_CHECK: privilegeGroup.cohortmembers.create,
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  //AssignTenant
  '/user/v1/assign-tenant': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  //rbac
  '/user/v1/rbac/roles/read/:id': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/rbac/roles/create': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/rbac/roles/update/:id': createRouteObject({
    put: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/rbac/roles/list/roles': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/rbac/roles/delete/:roleId': createRouteObject({
    delete: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/rbac/privileges': createRouteObject({
    get: {
      checksNeeded: ['ROLE_CHECK'],
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  // add create first
  '/user/v1/rbac/privileges/create': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/rbac/privileges/:privilegeId': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/rbac/usersRoles': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/rbac/usersRoles/:userId': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/assignprivilege': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/assignprivilege/:roleId': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/user/v1/tenant/create': createRouteObject({
    post: {},
  }),
  '/user/v1/tenant/update/:tenantId': createRouteObject({
    patch: {},
  }),
  '/user/v1/tenant/delete/:identifier': createRouteObject({
    post: {},
  }),
  '/user/v1/academicyears/create': createRouteObject({
    post: {},
  }),
  '/user/v1/academicyears/list': createRouteObject({
    post: {},
  }),
  '/user/v1/form/update/:formId': createRouteObject({
    patch: {},
  }),
  '/user/v1/academicyears/:identifier': createRouteObject(common_public_get),
  '/user/v1/form/read': createRouteObject(common_public_get),
  '/user/v1/fields/options/read': createRouteObject({
    post: {},
  }),
  '/user/v1/fields/options/delete/:identifier': createRouteObject({
    delete: {},
  }),
  '/user/v1/fields/update/:identifier': createRouteObject({
    patch: {},
  }),
  '/user/v1/fields/formfields': createRouteObject({
    get: {},
  }),
  '/user/v1/fields/search': createRouteObject({
    post: {},
  }),
  '/user/v1/fields/values/delete': createRouteObject({
    delete: {},
  }),
  //event-service
  //event
  '/event-service/event/v1/create': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.event.create,
    },
  }),
  '/event-service/event/v1/list': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.common,
      PRIVILEGE_CHECK: privilegeGroup.event.read,
    },
  }),
  '/event-service/event/v1/:id': createRouteObject({
    patch: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
      PRIVILEGE_CHECK: privilegeGroup.event.update,
    },
  }),
  //event-attendance
  '/event-service/attendance/v1/markeventattendance': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/event-service/attendees/v1/create': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/event-service/attendees/v1/list': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/event-service/attendees/v1': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
    delete: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),

  //notification-service
  //notification templates
  '/notification-templates': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/notification-templates/list': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/notification-templates/:id': createRouteObject({
    patch: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
    delete: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  //notification-send
  '/notification/send': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/notification/sendTopicNotification': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  //notification-queue
  '/queue': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/queue/list': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/queue/:id': createRouteObject({
    patch: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),

  //tracking-service
  //tracking
  '/v1/tracking/assessment/read/:assessmentTrackingId': createRouteObject({
    get: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/assessment/create': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.create,
      ROLE_CHECK: rolesGroup.youth,
    },
  }),
  '/v1/tracking/assessment/search': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/assessment/search/status': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/assessment/list': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/assessment/delete/:assessmentTrackingId': createRouteObject({
    delete: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.delete,
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  //tracking-content
  '/v1/tracking/content/read/:contentTrackingId': createRouteObject({
    get: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/content/create': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.create,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/content/search': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/content/search/status': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/content/list': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/content/delete/:contentTrackingId': createRouteObject({
    delete: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.delete,
      ROLE_CHECK: rolesGroup.admin_center_admin,
    },
  }),
  '/v1/tracking/content/course/status': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/content/unit/status': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/v1/tracking/content/course/inprogress': createRouteObject({
    post: {
      //PRIVILEGE_CHECK: privilegeGroup.tracking.read,
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  // todos
  '/todo/create': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),
  '/todo/list': createRouteObject({
    post: {
      ROLE_CHECK: rolesGroup.common,
    },
  }),
  '/todo/:id': createRouteObject({
    get: {
      ROLE_CHECK: rolesGroup.common,
    },
    patch: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
    delete: {
      ROLE_CHECK: rolesGroup.admin_center_admin_trainer,
    },
  }),

  //OTP
  '/user/v1/send-otp': createRouteObject({
    post: {
      // PRIVILEGE_CHECK: privilegeGroup.users.delete,
      // ROLE_CHECK: rolesGroup.admin_team_leader_teacher,
    },
  }),
  '/user/v1/verify-otp': createRouteObject({
    post: {
      // PRIVILEGE_CHECK: privilegeGroup.users.delete,
      // ROLE_CHECK: rolesGroup.admin_team_leader_teacher,
    },
  }),

  //sunbird knowlg and inQuiry service
  //public

  '/api/question/v2/list': createRouteObject({ post: {} }, '/question/v5/list'),

  '/action/question/v2/list': createRouteObject(
    { post: {} },
    '/question/v5/list',
  ),
  '/action/question/v2/private/read/:identifier': createRouteObject(
    common_public_get,
    '/question/v5/private/read/:identifier',
  ),

  '/action/questionset/v2/read/:identifier': createRouteObject(
    common_public_get,
    '/questionset/v5/read/:identifier',
  ),

  '/action/questionset/v2/hierarchy/:identifier': createRouteObject(
    common_public_get,
    '/questionset/v5/hierarchy/:identifier',
  ),
  '/action/questionset/v2/comment/read/:identifier': createRouteObject(
    common_public_get,
    '/questionset/v5/comment/read/:identifier',
  ),
  '/api/channel/v1/read/:identifier': createRouteObject(
    common_public_get,
    '/channel/v3/read/:identifier',
  ),
  '/api/framework/v1/read/:identifier': createRouteObject(
    common_public_get,
    '/framework/v3/read/:identifier',
  ),
  '/action/question/v2/read/:identifier': createRouteObject(
    common_public_get,
    '/question/v5/read/:identifier',
  ),
  '/action/asset/v1/read/:identifier': createRouteObject(
    common_public_get,
    '/asset/v4/read/:identifier',
  ),
  '/action/content/v3/read/:identifier': createRouteObject(
    common_public_get,
    '/content/v3/read/:identifier',
  ),
  '/api/content/v1/read/:identifier': createRouteObject(
    common_public_get,
    '/content/v3/read/:identifier',
  ),
  '/action/questionset/private/v2/read/:identifier': createRouteObject(
    common_public_get,
    '/questionset/v5/private/read/:identifier',
  ),
  //secure

  '/action/composite/v3/search': createRouteObject(
    {
      post: {},
    },
    '/v3/search',
  ),
  '/action/object/category/definition/v1/read': createRouteObject(
    {
      post: {},
    },
    '/object/category/definition/v4/read',
  ),

  '/api/course/v1/hierarchy/:identifier': createRouteObject(
    common_public_get,
    '/content/v3/hierarchy/:identifier',
  ),
  '/action/license/v3/create': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/license/v3/create',
  ),
  '/action/license/v3/read/:identifier': createRouteObject(
    {
      get: {
        ...common_role_check,
      },
    },
    '/license/v3/read/:identifier',
  ),
  '/action/license/v3/update/:identifier': createRouteObject(
    {
      patch: {
        ...common_role_check,
      },
    },
    '/license/v3/update/:identifier',
  ),
  '/action/license/v3/retire/:identifier': createRouteObject(
    {
      delete: {
        ...common_role_check,
      },
    },
    '/license/v3/retire/:identifier',
  ),

  //channel API
  '/api/channel/v1/create': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/channel/v3/create',
  ),
  '/api/channel/v1/update/:identifier': createRouteObject(
    {
      patch: {
        ...common_role_check,
      },
    },
    '/channel/v3/update/:identifier',
  ),
  '/api/channel/v1/retire/:identifier': createRouteObject(
    {
      delete: {
        ...common_role_check,
      },
    },
    '/channel/v3/retire/:identifier',
  ),

  //framework API
  '/api/framework/v1/create': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/framework/v3/create',
  ),
  '/api/framework/v1/update/:identifier': createRouteObject(
    {
      patch: {
        ...common_role_check,
      },
    },
    '/framework/v3/update/:identifier',
  ),
  '/api/framework/v1/list': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/framework/v3/list',
  ),
  '/api/framework/v1/copy/:identifier': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/framework/v3/copy/',
  ),
  '/api/framework/v1/retire/:identifier': createRouteObject(
    {
      delete: {
        ...common_role_check,
      },
    },
    '/framework/v3/retire/:identifier',
  ),
  '/api/framework/v1/publish/:identifier': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/framework/v3/publish/:identifier',
  ),
  '/api/framework/v1/category/create': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/framework/v3/category/create',
  ),
  '/api/framework/v1/category/read/:identifier': createRouteObject(
    {
      get: {
        ...common_role_check,
      },
    },
    '/framework/v3/category/read/:identifier',
  ),
  '/api/framework/v1/category/update/:identifier': createRouteObject(
    {
      patch: {
        ...common_role_check,
      },
    },
    '/framework/v3/category/update/:identifier',
  ),

  '/api/framework/v1/category/retire/:identifier': createRouteObject(
    {
      delete: {
        ...common_role_check,
      },
    },
    '/framework/v3/category/retire/:identifier',
  ),
  '/api/framework/v1/category/master/create': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/framework/v3/category/master/create',
  ),
  '/api/framework/v1/category/master/update/:identifier': createRouteObject(
    {
      patch: {
        ...common_role_check,
      },
    },
    '/framework/v3/category/master/update/:identifier',
  ),
  '/api/framework/v1/category/master/read/:identifier': createRouteObject(
    {
      get: {
        ...common_role_check,
      },
    },
    '/framework/v3/category/master/read/:identifier',
  ),
  '/api/framework/v1/category/master/retire/:identifier': createRouteObject(
    {
      delete: {
        ...common_role_check,
      },
    },
    '/framework/v3/category/master/retire/:identifier',
  ),

  '/api/framework/v1/term/create': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/framework/v3/term/create',
  ),
  '/api/framework/v1/term/read/:identifier': createRouteObject(
    {
      get: {
        ...common_role_check,
      },
    },
    '/framework/v3/term/read/:identifier',
  ),
  '/api/framework/v1/term/update/:identifier': createRouteObject(
    {
      patch: {
        ...common_role_check,
      },
    },
    '/framework/v3/term/update/:identifier',
  ),
  '/api/framework/v1/term/retire/:identifier': createRouteObject(
    {
      delete: {
        ...common_role_check,
      },
    },
    '/framework/v3/term/retire/:identifier',
  ),
  //Object API
  '/api/object/category/v1/create': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/object/category/v4/create',
  ),
  '/api/object/category/v1/update': createRouteObject(
    {
      patch: {
        ...common_role_check,
      },
    },
    '/object/category/v4/update',
  ),
  '/api/object/category/v1/read': createRouteObject(
    {
      get: {
        ...common_role_check,
      },
    },
    '/object/category/v4/read',
  ),
  '/api/object/category/v1/retire': createRouteObject(
    {
      delete: {
        ...common_role_check,
      },
    },
    '/object/category/v4/retire',
  ),
  '/api/object/category/definition/v1/create': createRouteObject(
    {
      post: {
        ...common_role_check,
      },
    },
    '/object/category/definition/v4/create',
  ),
  '/api/object/category/definition/v1/update': createRouteObject(
    {
      patch: {
        ...common_role_check,
      },
    },
    '/object/category/definition/v4/update',
  ),
  '/api/object/category/definition/v1/update/:identifier': createRouteObject(
    {
      patch: {
        ...common_role_check,
      },
    },
    '/object/category/definition/v4/update/:identifier',
  ),
  '/api/object/category/definition/v1/read/:identifier': createRouteObject(
    {
      get: {
        ...common_role_check,
      },
    },
    '/object/category/definition/v4/read/:identifier',
  ),
};
export const urlPatterns = Object.keys(apiList);

//add public api
export const publicAPI = [
  '/user/v1/auth',
  '/user/v1/create',
  '/user/v1/fields/options/read',
  '/user/v1/tenant/read',
  '/user/v1/tenant/create',
  '/user/v1/tenant/search',
  '/user/v1/tenant/update/:tenantId',
  '/user/v1/tenant/delete/:identifier',
  '/user/v1/auth/login',
  '/user/v1/auth',
  '/api/question/v2/list',
  '/action/question/v2/list',
  '/action/question/v2/private/read/:identifier',
  '/action/questionset/v2/read/:identifier',
  '/action/questionset/v2/hierarchy/:identifier',
  '/action/questionset/v2/comment/read/:identifier',
  '/api/channel/v1/read/:identifier',
  '/api/framework/v1/read/:identifier',
  '/action/question/v2/read/:identifier',
  '/action/questionset/private/v2/read/:identifier',
  '/action/object/category/definition/v1/read',
  '/user/v1/password-reset-link',
  '/user/v1/password-reset-otp',
  '/user/v1/forgot-password',
  '/user/v1/send-otp',
  '/user/v1/verify-otp',
  '/questionset/v5/private/read/:identifier',
  '/user/v1/form/read',
  '/user/v1/form/update/:formId',
  '/action/composite/v3/search',
  '/api/content/v1/read/:identifier',
  '/api/course/v1/hierarchy/:identifier',
  '/prathamservice/v1/cronjob',
  '/prathamservice/v1/import-user',
  '/user/v1/fields/options/delete/:identifier',
  '/user/v1/check',
  '/user/v1/suggestUsername',
];

// api which required academic year
export const apiListForAcademicYear = [
  '/user/v1/cohortmember/list',
  '/user/v1/cohortmember/bulkCreate',
  '/user/v1/cohortmember/create',
  '/user/v1/cohortmember/read/:identifier',
  '/user/v1/cohort/create',
  '/user/v1/cohort/search',
  '/user/v1/cohort/mycohorts/:identifier',
];

function convertToRegex(pattern) {
  const regexString = pattern.replace(/:[^\s/]+/g, '([\\w-]+)');
  return new RegExp(`^${regexString}$`);
}

export const regexPatterns = urlPatterns.map(convertToRegex);
